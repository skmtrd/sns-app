import { Reply } from '@/lib/types';

type QuestionReplyProps = {
  reply: Reply;
  amountOfReply: number;
};

const QuestionReply: React.FC<QuestionReplyProps> = ({ reply, amountOfReply }) => {
  return (
    <div className='mt-4'>
      <div className='mt-2 border-l-2 border-blue-300 pl-4'>
        <p className='text-sm text-gray-600'>{reply.author.name}さんの回答:</p>
        <p>{reply.content}</p>
      </div>
    </div>
  );
};

export default QuestionReply;
