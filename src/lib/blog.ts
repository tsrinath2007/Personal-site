import fs from "fs";
import path from "path";
import { supabase } from "@/lib/supabase";

export interface BlogPost {
  slug: string;
  title: string;
  summary: string;
  date: string;
  draft: boolean;
  spineColor: string;
  relatedHackathon?: string;
  content: string;
}

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

function parseFrontmatter(fileContent: string): { frontmatter: Record<string, string | boolean>; content: string } {
  const match = fileContent.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) {
    return { frontmatter: {}, content: fileContent };
  }

  const rawYaml = match[1];
  const content = match[2];
  const frontmatter: Record<string, string | boolean> = {};

  for (const line of rawYaml.split(/\r?\n/)) {
    const colonIndex = line.indexOf(":");
    if (colonIndex !== -1) {
      const key = line.slice(0, colonIndex).trim();
      let val: string | boolean = line.slice(colonIndex + 1).trim();
      if (val === "true") val = true;
      else if (val === "false") val = false;
      frontmatter[key] = val;
    }
  }

  return { frontmatter, content };
}

export function getLocalPosts(): BlogPost[] {
  try {
    if (!fs.existsSync(BLOG_DIR)) {
      return [];
    }

    const files = fs.readdirSync(BLOG_DIR).filter((file) => file.endsWith(".md") || file.endsWith(".mdx"));

    const posts: BlogPost[] = files.map((file) => {
      const slug = file.replace(/\.(md|mdx)$/, "");
      const fullPath = path.join(BLOG_DIR, file);
      const fileContent = fs.readFileSync(fullPath, "utf-8");
      const { frontmatter, content } = parseFrontmatter(fileContent);

      return {
        slug,
        title: String(frontmatter.title || slug),
        summary: String(frontmatter.summary || ""),
        date: String(frontmatter.date || ""),
        draft: Boolean(frontmatter.draft),
        spineColor: String(frontmatter.spineColor || "var(--tan)"),
        relatedHackathon: frontmatter.relatedHackathon ? String(frontmatter.relatedHackathon) : undefined,
        content
      };
    });

    return posts;
  } catch {
    return [];
  }
}

export function getLocalPostBySlug(slug: string): BlogPost | null {
  try {
    const mdPath = path.join(BLOG_DIR, `${slug}.md`);
    const mdxPath = path.join(BLOG_DIR, `${slug}.mdx`);
    const fullPath = fs.existsSync(mdPath) ? mdPath : fs.existsSync(mdxPath) ? mdxPath : null;

    if (!fullPath) return null;

    const fileContent = fs.readFileSync(fullPath, "utf-8");
    const { frontmatter, content } = parseFrontmatter(fileContent);

    return {
      slug,
      title: String(frontmatter.title || slug),
      summary: String(frontmatter.summary || ""),
      date: String(frontmatter.date || ""),
      draft: Boolean(frontmatter.draft),
      spineColor: String(frontmatter.spineColor || "var(--tan)"),
      relatedHackathon: frontmatter.relatedHackathon ? String(frontmatter.relatedHackathon) : undefined,
      content
    };
  } catch {
    return null;
  }
}

export async function getAllPosts(): Promise<BlogPost[]> {
  const localPosts = getLocalPosts();
  const postMap = new Map<string, BlogPost>();

  // Add local posts first
  for (const post of localPosts) {
    postMap.set(post.slug, post);
  }

  // Fetch from Supabase and merge (Supabase takes priority for edits)
  try {
    const { data: supaPosts, error } = await supabase
      .from("posts")
      .select("*")
      .order("date", { ascending: false });

    if (!error && supaPosts && supaPosts.length > 0) {
      for (const p of supaPosts) {
        postMap.set(p.slug, {
          slug: p.slug,
          title: p.title || p.slug,
          summary: p.summary || "",
          date: p.date || new Date().toISOString().split("T")[0],
          draft: Boolean(p.draft),
          spineColor: p.spine_color || p.spineColor || "var(--tan)",
          relatedHackathon: p.related_hackathon || p.relatedHackathon || undefined,
          content: (p.content || "").trim()
        });
      }
    }
  } catch {
    // If Supabase fetch fails, rely on local posts
  }

  const posts = Array.from(postMap.values());
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const { data: supaPost, error } = await supabase
      .from("posts")
      .select("*")
      .eq("slug", slug)
      .maybeSingle();

    if (!error && supaPost) {
      return {
        slug: supaPost.slug,
        title: supaPost.title || supaPost.slug,
        summary: supaPost.summary || "",
        date: supaPost.date || new Date().toISOString().split("T")[0],
        draft: Boolean(supaPost.draft),
        spineColor: supaPost.spine_color || supaPost.spineColor || "var(--tan)",
        relatedHackathon: supaPost.related_hackathon || supaPost.relatedHackathon || undefined,
        content: (supaPost.content || "").trim()
      };
    }
  } catch {
    // fallback
  }

  return getLocalPostBySlug(slug);
}
