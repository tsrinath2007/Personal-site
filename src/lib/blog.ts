import fs from "fs";
import path from "path";

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

export function getAllPosts(): BlogPost[] {
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

  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPostBySlug(slug: string): BlogPost | null {
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
}
