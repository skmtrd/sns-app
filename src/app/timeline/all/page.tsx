"use client";
import AddPost from "@/components/timeline/AddPost";
import { Post } from "@/components/timeline/Post";
import console from "console";
import { Loader2 } from "lucide-react";
import React from "react";
import useSWR from "swr";
import { z } from "zod";

export const postSchema = z.object({
  author: z.object({
    name: z.string(),
  }),
  createdAt: z.string(),
  content: z.string(),
});

const TimelineAll = () => {
  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data, error, isLoading } = useSWR("/api/post", fetcher, {
    refreshInterval: 20000,
    revalidateOnFocus: true,
  });

  if (isLoading) {
    return (
      <div className='flex h-svh w-full flex-1 grow flex-col items-center justify-center gap-4 bg-gray-100'>
        <Loader2 size='64' className='animate-spin text-blue-600' />
        ロード中...
      </div>
    );
  }
  if (error) {
    return <div>Error</div>;
  }

  const posts = postSchema.array().parse(data.data.reverse());

  return (
    <div className='flex w-full flex-1 grow flex-col items-center gap-4 overflow-y-scroll bg-gray-100'>
      <div className='h-10 w-full'></div>
      <AddPost />
      <div className='flex w-full grow flex-col items-center gap-y-4 border-t-2 p-3'>
        {posts.reverse().map((post, index) => (
          <Post
            key={index}
            username={post.author.name}
            timestamp={post.createdAt}
            content={post.content}
            // 後で実装
            tags={[]}
          />
        ))}
      </div>
    </div>
  );
};

export default TimelineAll;
