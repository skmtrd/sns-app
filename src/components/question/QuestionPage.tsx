import { useDeleteQuestion } from '@/hooks/DeleteContent/useDeleteQuestion';
import { scrollToTop } from '@/lib/scrollToTop';
import { Question } from '@/lib/types';
import FixedHeader from '../layout/FixedHeader';
import QuestionPost from './QuestionPost';

type QuestionPageProps = {
  questions: Question[];
  currentUserId: string;
  title: string;
  target: string | null;
};

const QuestionPage: React.FC<QuestionPageProps> = ({ questions, currentUserId, title, target }) => {
  const handleDeleteQuestion = useDeleteQuestion(questions);
  return (
    <div
      id='mainContent'
      className='flex w-full flex-1 grow flex-col items-center overflow-y-scroll bg-gray-100'
    >
      <FixedHeader title={title} target={target} scrollToTop={scrollToTop} />
      <div className='mx-auto mt-10 w-full max-w-5xl py-8 sm:px-6 lg:px-8'>
        <div className='flex flex-col items-center space-y-6'>
          {questions.map((question) => (
            <QuestionPost
              key={question.id}
              question={question}
              handleDeletePost={handleDeleteQuestion}
              currentUserId={currentUserId}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuestionPage;
