import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { supabase } from "@/lib/supabase";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const TOKEN_VALUE = "ses_authenticated_session_93817";
const BLOG_DIR = path.join(process.cwd(), "content", "blog");

const NO_CACHE_HEADERS = {
  "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
  Pragma: "no-cache",
  Expires: "0"
};

function isAuthorized(req: NextRequest): boolean {
  const token = req.cookies.get("ses_admin_token")?.value;
  return token === TOKEN_VALUE;
}

function parseFrontmatter(fileContent: string) {
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

// GET all posts
export async function GET(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // 1. Try Supabase posts table
  try {
    const { data: supaPosts, error: supaError } = await supabase
      .from("posts")
      .select("*")
      .order("date", { ascending: false });

    if (!supaError && supaPosts && supaPosts.length > 0) {
      const formatted = supaPosts.map((p) => ({
        slug: p.slug,
        title: p.title || p.slug,
        summary: p.summary || "",
        date: p.date || new Date().toISOString().split("T")[0],
        draft: Boolean(p.draft),
        spineColor: p.spine_color || p.spineColor || "var(--tan)",
        relatedHackathon: p.related_hackathon || p.relatedHackathon || "",
        content: (p.content || "").trim()
      }));
      return NextResponse.json({ posts: formatted }, { headers: NO_CACHE_HEADERS });
    }
  } catch {
    // Supabase table not created - fall through to local files
  }

  // 2. Local markdown files fallback
  if (!fs.existsSync(BLOG_DIR)) {
    fs.mkdirSync(BLOG_DIR, { recursive: true });
    return NextResponse.json({ posts: [] });
  }

  const files = fs.readdirSync(BLOG_DIR).filter((file) => file.endsWith(".md") || file.endsWith(".mdx"));

  const posts = files.map((file) => {
    const slug = file.replace(/\.(md|mdx)$/, "");
    const fullPath = path.join(BLOG_DIR, file);
    const fileContent = fs.readFileSync(fullPath, "utf-8");
    const { frontmatter, content } = parseFrontmatter(fileContent);

    return {
      slug,
      title: String(frontmatter.title || slug),
      summary: String(frontmatter.summary || ""),
      date: String(frontmatter.date || new Date().toISOString().split("T")[0]),
      draft: Boolean(frontmatter.draft),
      spineColor: String(frontmatter.spineColor || "var(--tan)"),
      relatedHackathon: String(frontmatter.relatedHackathon || ""),
      content: content.trim()
    };
  });

  posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return NextResponse.json({ posts }, { headers: NO_CACHE_HEADERS });
}

// POST: create or update a post
export async function POST(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401, headers: NO_CACHE_HEADERS });
  }

  try {
    const body = await req.json();
    const { title, slug, summary, date, draft, spineColor, relatedHackathon, content, oldSlug } = body;

    if (!title || !slug) {
      return NextResponse.json({ error: "Title and slug are required" }, { status: 400, headers: NO_CACHE_HEADERS });
    }

    const cleanSlug = slug
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9_-]/g, "-")
      .replace(/-+/g, "-");

    if (!fs.existsSync(BLOG_DIR)) {
      fs.mkdirSync(BLOG_DIR, { recursive: true });
    }

    // If slug changed, remove the old file & delete old Supabase record
    if (oldSlug && oldSlug !== cleanSlug) {
      const oldMd = path.join(BLOG_DIR, `${oldSlug}.md`);
      const oldMdx = path.join(BLOG_DIR, `${oldSlug}.mdx`);
      if (fs.existsSync(oldMd)) fs.unlinkSync(oldMd);
      if (fs.existsSync(oldMdx)) fs.unlinkSync(oldMdx);

      try {
        await supabase.from("posts").delete().eq("slug", oldSlug);
      } catch {
        // non-fatal
      }
    }

    // 1. Write local markdown file
    const fileContent = `---
title: ${title.replace(/\n/g, " ")}
summary: ${(summary || "").replace(/\n/g, " ")}
date: ${date || new Date().toISOString().split("T")[0]}
draft: ${Boolean(draft)}
spineColor: ${spineColor || "var(--tan)"}
relatedHackathon: ${relatedHackathon ? String(relatedHackathon).replace(/\n/g, " ") : ""}
---

${(content || "").trim()}
`;

    const filePath = path.join(BLOG_DIR, `${cleanSlug}.md`);
    fs.writeFileSync(filePath, fileContent, "utf-8");

    // 2. Sync to Supabase posts table
    try {
      await supabase.from("posts").upsert({
        slug: cleanSlug,
        title: title.trim(),
        summary: (summary || "").trim(),
        date: date || new Date().toISOString().split("T")[0],
        draft: Boolean(draft),
        spine_color: spineColor || "var(--tan)",
        related_hackathon: relatedHackathon ? String(relatedHackathon).trim() : null,
        content: (content || "").trim(),
        updated_at: new Date().toISOString()
      });
    } catch {
      // non-fatal
    }

    return NextResponse.json({ success: true, slug: cleanSlug }, { headers: NO_CACHE_HEADERS });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : "Failed to save post";
    return NextResponse.json({ error: errorMsg }, { status: 500, headers: NO_CACHE_HEADERS });
  }
}

// DELETE a post
export async function DELETE(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401, headers: NO_CACHE_HEADERS });
  }

  try {
    const { searchParams } = new URL(req.url);
    const slug = searchParams.get("slug");

    if (!slug) {
      return NextResponse.json({ error: "Slug is required" }, { status: 400, headers: NO_CACHE_HEADERS });
    }

    // 1. Delete local markdown file
    const mdPath = path.join(BLOG_DIR, `${slug}.md`);
    const mdxPath = path.join(BLOG_DIR, `${slug}.mdx`);

    if (fs.existsSync(mdPath)) fs.unlinkSync(mdPath);
    if (fs.existsSync(mdxPath)) fs.unlinkSync(mdxPath);

    // 2. Delete from Supabase posts table
    try {
      await supabase.from("posts").delete().eq("slug", slug);
    } catch {
      // non-fatal
    }

    return NextResponse.json({ success: true, message: `Deleted ${slug}` }, { headers: NO_CACHE_HEADERS });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : "Failed to delete post";
    return NextResponse.json({ error: errorMsg }, { status: 500, headers: NO_CACHE_HEADERS });
  }
}
