import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getAllPosts, getPostBySlug } from "@/lib/blog";
import { hackathons } from "@/../content/hackathons";

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug
  }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {
      title: "Post Not Found — SES.Builds"
    };
  }

  return {
    title: `${post.title} — SES.Builds`,
    description: post.summary
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  // Simple clean markdown rendering for lines
  const lines = post.content.trim().split(/\r?\n/);

  return (
    <div style={{ minHeight: "100vh", background: "var(--wall, #f0e8e1)", color: "var(--ink)" }}>
      <header
        className="top"
        style={{
          position: "relative",
          background: "transparent",
          backdropFilter: "none",
          WebkitBackdropFilter: "none",
          border: "none",
          borderBottom: "none",
          boxShadow: "none",
          pointerEvents: "auto"
        }}
      >
        <div className="top-in">
          <Link href="/" className="brand" style={{ textDecoration: "none", color: "inherit" }}>
            SES.Builds
          </Link>
          <nav className="nav" aria-label="Main">
            <Link href="/">Desk</Link>
            <Link href="/blog">Blog</Link>
          </nav>
          <Link href="/#contact" className="pill top-available-pill" style={{ textDecoration: "none", color: "inherit" }}>
            <span className="dot" aria-hidden="true"></span>
            Available for opportunities <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </header>

      <main style={{ maxWidth: 760, margin: "40px auto", padding: "0 20px" }}>
        <div style={{ marginBottom: 28 }}>
          <Link
            href="/blog"
            className="k"
            style={{
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              marginBottom: 16
            }}
          >
            ← Back to all posts
          </Link>

          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
            {post.draft && <span className="tagd">Draft</span>}
            {post.date && <span className="k">{post.date}</span>}
          </div>

          <h1 style={{ fontSize: "clamp(2rem, 5vw, 2.8rem)", fontWeight: 700, margin: "8px 0" }}>
            {post.title}
          </h1>

          {post.summary && (
            <p className="lead" style={{ marginTop: 12, fontStyle: "italic" }}>
              {post.summary}
            </p>
          )}

          {post.relatedHackathon && (
            <div
              style={{
                marginTop: 20,
                padding: "16px 20px",
                background: "rgba(0, 0, 0, 0.03)",
                border: "1px solid var(--line)",
                borderRadius: 8,
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 12
              }}
            >
              <div>
                <span
                  style={{
                    fontSize: "0.75rem",
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                    color: "var(--ink-2)",
                    fontWeight: 700,
                    display: "block"
                  }}
                >
                  🏆 Related Hackathon Project
                </span>
                <p style={{ margin: "4px 0 0", fontWeight: 600, fontSize: "1.05rem" }}>
                  {hackathons.find((h) => h.id === post.relatedHackathon)?.title || post.relatedHackathon}
                </p>
              </div>
              <Link
                href="/laptop"
                style={{
                  fontSize: "0.85rem",
                  padding: "7px 14px",
                  background: "var(--ink)",
                  color: "var(--paper)",
                  borderRadius: 6,
                  textDecoration: "none",
                  fontWeight: 600
                }}
              >
                Open in Terminal ↗
              </Link>
            </div>
          )}
        </div>

        <article
          style={{
            borderTop: "1px solid var(--line)",
            paddingTop: 28,
            display: "grid",
            gap: 16,
            fontSize: "1.125rem",
            lineHeight: 1.7
          }}
        >
          {lines.map((line, idx) => {
            const trimmed = line.trim();
            if (!trimmed) return null;
            if (trimmed.startsWith("# ")) {
              return null; // Already rendered in header
            }
            if (trimmed.startsWith("## ")) {
              return (
                <h2 key={idx} style={{ fontSize: "1.6rem", marginTop: 20 }}>
                  {trimmed.replace(/^##\s+/, "")}
                </h2>
              );
            }
            if (trimmed.startsWith("- ")) {
              return (
                <li key={idx} style={{ marginLeft: 20 }}>
                  {trimmed.replace(/^-\s+/, "")}
                </li>
              );
            }
            if (trimmed.startsWith("*") && trimmed.endsWith("*")) {
              return (
                <p key={idx} style={{ fontStyle: "italic", color: "var(--ink-2)" }}>
                  {trimmed.slice(1, -1)}
                </p>
              );
            }
            return <p key={idx}>{trimmed}</p>;
          })}
        </article>
      </main>
    </div>
  );
}
