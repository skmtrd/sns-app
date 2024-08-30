import TextContent from '../element/TextContent';

type QuestionReplyProps = {
  replyAuthorName: string;
  textContent: string;
};

const QuestionReplies: React.FC<QuestionReplyProps> = ({ replyAuthorName, textContent }) => {
  return (
    <div className='mt-4'>
      <div className='mt-2 border-l-2 border-blue-300 pl-4'>
        <p className='text-sm text-gray-600'>{replyAuthorName}さんの回答:</p>
        <TextContent textContent={textContent} />
      </div>
    </div>
  );
};

export default QuestionReplies;
