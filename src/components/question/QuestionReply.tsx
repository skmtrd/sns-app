import { Reply } from '@/lib/types';
import TextContent from '../element/TextContent';

type QuestionReplyProps = {
  reply: Reply;
  amountOfReply: number;
};

const QuestionReply: React.FC<QuestionReplyProps> = ({ reply, amountOfReply }) => {
  return (
    <div className='mt-4'>
      <div className='mt-2 border-l-2 border-blue-300 pl-4'>
        <p className='text-sm text-gray-600'>{reply.author.name}さんの回答:</p>
        <TextContent textContent={reply.content} />
      </div>
    </div>
  );
};

export default QuestionReply;
