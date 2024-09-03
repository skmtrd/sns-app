import { useDeleteQuestion } from '@/hooks/DeleteContent/useDeleteQuestion';
import { scrollToTop } from '@/lib/scrollToTop';
import { Question } from '@/lib/types';
import FixedHeader from '../layout/FixedHeader';
import QuestionPost from './QuestionPost';

type QuestionPageProps = {
  questions: Question[];
  currentClerkId: string;
  title: string;
  target: string | null;
};

const QuestionPage: React.FC<QuestionPageProps> = ({
  questions,
  currentClerkId,
  title,
  target,
}) => {
  const handleDeleteQuestion = useDeleteQuestion(questions);
  return (
    <div
      id='mainContent'
      className='flex w-full flex-1 grow flex-col items-center gap-4 overflow-y-scroll bg-gray-100'
    >
      <FixedHeader title={title} target={target} scrollToTop={scrollToTop} />
      <div className='mt-10 flex w-full grow flex-col items-center gap-y-4 p-3'>
        {questions.map((question) => (
          <QuestionPost
            key={question.id}
            question={question}
            handleDeletePost={handleDeleteQuestion}
            currentClerkId={currentClerkId}
          />
        ))}
      </div>
    </div>
  );
};

export default QuestionPage;
