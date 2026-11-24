import React from "react";
import { getAllPosts } from "@/lib/blog";
import { DeskScene } from "@/components/desk/DeskScene";

export default async function Home() {
  const posts = await getAllPosts();

  return <DeskScene blogPosts={posts} />;
}
