import React from "react";
import Link from "next/link";
import { BlogPost } from "@/lib/blog";

interface BlogDrawerProps {
  posts: BlogPost[];
}

export function BlogDrawer({ posts }: BlogDrawerProps) {
  return (
    <>
      <p className="lead">Notes on how I build things. Each book on the desk is one post.</p>
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
      <p className="k">Draft titles. New posts will appear here as books.</p>
    </>
  );
}
