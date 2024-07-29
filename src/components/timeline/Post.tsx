import { formatTime } from "@/lib/formatTime";
import { useEffect, useState } from "react";

type PostProps = {
  username: string;
  timestamp: string;
  content: string;
  tags?: string[];
};

export const Post: React.FC<PostProps> = ({
  username,
  timestamp,
  content,
  tags,
}) => {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const updateDate = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(updateDate);
  }, []);

  return (
    <div className='w-11/12 rounded-lg bg-white p-4 shadow'>
      <div className='mb-2 flex items-start justify-between'>
        <h3 className='font-bold'>{username}</h3>
        <p className='text-sm text-gray-500'>{formatTime(timestamp, time)}</p>
      </div>
      <p className='mb-2'>{content}</p>
      <div className='flex flex-wrap'>
        {tags &&
          tags.map((tag, index) => (
            <span
              key={index}
              className='mb-2 mr-2 rounded-full bg-blue-100 px-2 py-1 text-xs text-blue-800'
            >
              #{tag}
            </span>
          ))}
      </div>
    </div>
  );
};
