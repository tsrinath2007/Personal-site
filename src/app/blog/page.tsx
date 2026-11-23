import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { getAllPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog — SES.Builds",
  description: "Notes on how I build things. Voice RAG, GraphRAG, on-device AI privacy and rapid shipping."
};

export default function BlogIndexPage() {
  const posts = getAllPosts();

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
            <Link href="/blog" style={{ borderBottomColor: "var(--ink)" }}>
              Blog
            </Link>
          </nav>
          <Link href="/#contact" className="pill top-available-pill" style={{ textDecoration: "none", color: "inherit" }}>
            <span className="dot" aria-hidden="true"></span>
            Available for opportunities <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </header>

      <main style={{ maxWidth: 860, margin: "40px auto", padding: "0 20px" }}>
        <div style={{ marginBottom: 32 }}>
          <Link
            href="/"
            className="k"
            style={{
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              marginBottom: 16
            }}
          >
            ← Back to desk
          </Link>
          <h1 style={{ fontSize: "2.6rem", fontWeight: 700, margin: "8px 0" }}>
            Notes &amp; Writing
          </h1>
          <p className="lead">
            Notes on how I build things. Each book on the desk is one post.
          </p>
        </div>

        <ol className="shelf">
          {posts.map((post) => (
            <li key={post.slug}>
              <Link
                href={`/blog/${post.slug}`}
                className="book"
                style={{ "--spine": post.spineColor } as React.CSSProperties}
              >
                <span className="spine" aria-hidden="true"></span>
                <div>
                  <h3>{post.title}</h3>
                  <p>{post.summary}</p>
                </div>
                {post.draft && <span className="tagd">Draft</span>}
              </Link>
            </li>
          ))}
        </ol>

        <p className="k" style={{ marginTop: 24 }}>
          Draft titles. New posts will appear here as books.
        </p>
      </main>
    </div>
  );
}
