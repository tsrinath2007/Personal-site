import React from "react";
import { getAllPosts } from "@/lib/blog";
import { DeskScene } from "@/components/desk/DeskScene";

export default function Home() {
  const posts = getAllPosts();

  return <DeskScene blogPosts={posts} />;
}
