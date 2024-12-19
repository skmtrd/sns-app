'use client';

import { useGetQuestions } from '@/hooks/SWR/useGetQuestions';
import { useTagTab } from '@/hooks/useTagTab';
import { Profile, Question } from '@/lib/types';
import FixedHeader from '../layout/FixedHeader';
import QuestionSkeltonLoading from '../loading/QuestionSkeltonLoading';
import QuestionPost from './QuestionPost';
type QuestionPageProps = {
  initialQuestions: Question[];
  currentUserId: string;
  shouldPolling: boolean;
  userInfo: Profile;
};

const QuestionPage: React.FC<QuestionPageProps> = ({
  initialQuestions,
  currentUserId,
  shouldPolling,
  userInfo,
}) => {
  const { data, error, isLoading } = useGetQuestions(shouldPolling, initialQuestions);
  const questions = data || initialQuestions;
  const { currentTagId, handleTagClick } = useTagTab();

  const filteredQuestions =
    currentTagId === 'all'
      ? questions
      : questions.filter((question) =>
          question.author.tags?.some((tag) => tag.id === currentTagId),
        );

  if (!questions || isLoading) return <QuestionSkeltonLoading title={'質問'} subtitle={'すべて'} />;
  return (
    <div
      id='mainContent'
      className='flex w-full flex-1 grow flex-col items-center overflow-y-scroll bg-gray-100'
    >
      <FixedHeader
        userInfo={userInfo}
        handleTagClick={handleTagClick}
        currentTagId={currentTagId}
      />
      <div className='mx-auto mt-16 w-full max-w-5xl py-8 sm:px-6 lg:px-8'>
        <div className='flex flex-col items-center space-y-6'>
          {filteredQuestions.map((question: Question) => (
            <QuestionPost key={question.id} question={question} currentUserId={currentUserId} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuestionPage;
