'use client';

import { useGetQuestions } from '@/hooks/SWR/useGetQuestions';
import { Question } from '@/lib/types';
import FixedHeader from '../layout/FixedHeader';
import QuestionSkeltonLoading from '../loading/QuestionSkeltonLoading';
import QuestionPost from './QuestionPost';

type QuestionPageProps = {
  initialQuestions: Question[];
  currentUserId: string;
  title: string;
  target: string | null;
  shouldPolling: boolean;
};

const QuestionPage: React.FC<QuestionPageProps> = ({
  initialQuestions,
  currentUserId,
  title,
  target,
  shouldPolling,
}) => {
  const { data, error, isLoading } = useGetQuestions(shouldPolling, initialQuestions);
  const questions = data || initialQuestions;
  if (!questions || isLoading) return <QuestionSkeltonLoading title={'質問'} subtitle={'すべて'} />;
  return (
    <div
      id='mainContent'
      className='flex w-full flex-1 grow flex-col items-center overflow-y-scroll bg-gray-100'
    >
      <FixedHeader title={title} target={target} />
      <div className='mx-auto mt-10 w-full max-w-5xl py-8 sm:px-6 lg:px-8'>
        <div className='flex flex-col items-center space-y-6'>
          {questions.map((question) => (
            <QuestionPost key={question.id} question={question} currentUserId={currentUserId} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuestionPage;
