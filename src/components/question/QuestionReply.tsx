import type { Reply } from '@/lib/types';

const QuestionReply: React.FC<Reply> = ({ reply }) => {
  return (
    <div className='mt-4'>
      <h4 className='font-semibold'>回答</h4>
      <div className='mt-2 border-l-2 border-blue-300 pl-4'>
        <p className='text-sm text-gray-600'>{reply.author.name}さんの回答:</p>
        <p>{reply.content}</p>
      </div>
    </div>
  );
};

export default QuestionReply;
