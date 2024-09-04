'use client';
import QuestionSkeltonLoading from '@/components/loading/QuestionSkeltonLoading';
import QuestionPage from '@/components/question/QuestionPage';
import useData from '@/hooks/useData';
import { QuestionSchema } from '@/lib/schemas';
import { useAuth } from '@clerk/nextjs';
import { useSWRConfig } from 'swr';
import { z } from 'zod';

const QuestionAll = () => {
  const { mutate } = useSWRConfig();
  const { userId: currentClerkId } = useAuth();
  const { data: questions, error, isLoading } = useData('/api/question', z.array(QuestionSchema));

  if (error) {
    return <div>Error</div>;
  }

  if (isLoading || !questions || !currentClerkId) {
    return <QuestionSkeltonLoading title={'質問'} subtitle={'すべて'} />;
  }

  return (
    <QuestionPage
      questions={questions}
      currentClerkId={currentClerkId}
      title={'質問'}
      target={'すべて'}
    />
  );
};

export default QuestionAll;
