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
  return (
    <div className='bg-white rounded-lg shadow p-4 w-11/12'>
      <div className='flex justify-between items-start mb-2'>
        <h3 className='font-bold'>{username}</h3>
        {/* 〇〇時間前みたいなのは後で実装 */}
        <p className='text-sm text-gray-500'>{timestamp}</p>
      </div>
      <p className='mb-2'>{content}</p>
      <div className='flex flex-wrap'>
        {tags &&
          tags.map((tag, index) => (
            <span
              key={index}
              className='bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full mr-2 mb-2'
            >
              #{tag}
            </span>
          ))}
      </div>
    </div>
  );
};
