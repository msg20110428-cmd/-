import { readFile } from "fs/promises";

import { cookies } from "next/headers";

import HighQuality from "@/pages/high-quality/page";
import Simple from "@/pages/simple/page";

// 추후 DB 통합
async function getPosts() {
  const data = await readFile("data.json", "utf-8");

  return JSON.parse(data);
}

export default async function Page() {
  const cookieStore = await cookies();
  const mode = cookieStore.get("mode");

  const posts = await getPosts()
  
  if (mode?.value === "high-quality") {
    return (
      <HighQuality posts={posts} />
    );
  }
  else if (mode?.value === "simple") {
    return <Simple posts={posts} />;
  }
  else {
    throw new ReferenceError("Incorrect mode value");
  }
}