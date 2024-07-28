import { Post } from "@/components/timeline/Post";
import React from "react";

const TimelineAll = () => {
  const posts = [
    {
      username: "団長",
      timestamp: "二時間前",
      content: "星が取れない",
      tags: ["sss", "aaa"],
    },
    {
      username: "サカモトそうや",
      timestamp: "二時間前",
      content: "content",
      tags: ["#sss"],
    },
  ];
  return (
    <div className='flex-glow flex-col bg bg-gray-100 w-full items-center flex gap-4 overflow-scroll'>
      <div className='w-full h-10'></div>
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
