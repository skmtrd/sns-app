import { Post } from "@/components/timeline/Post";
import React from "react";

const TimelineAll = () => {
  // today is 2024-07-29
  const posts = [
    {
      username: "団長",
      timestamp: "2024-07-29T01:30:00",
      content: "星が取れない",
      tags: ["sss", "aaa"],
    },
    {
      username: "サカモトそうや",
      timestamp: "2024-07-25T01:30:00",
      content: "content",
      tags: ["#sss"],
    },
  ];
  return (
    <div className='flex w-full flex-1 grow flex-col items-center gap-4 overflow-y-scroll bg-gray-100'>
      <div className='h-10 w-full'></div>
      {posts.map((post, index) => (
        <Post
          key={index}
          username={post.username}
          timestamp={post.timestamp}
          content={post.content}
          tags={post.tags}
        />
      ))}
    </div>
  );
};

export default TimelineAll;
