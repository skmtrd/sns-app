'use client';
import QuestionSkeltonLoading from '@/components/loading/QuestionSkeltonLoading';
import QuestionPage from '@/components/question/QuestionPage';
import useData from '@/hooks/useData';
import { QuestionSchema } from '@/lib/schemas';
import { useSession } from 'next-auth/react';
import { z } from 'zod';

const QuestionAll = () => {
  const { data: session, status } = useSession();
  const { data: questions, error, isLoading } = useData('/api/question', z.array(QuestionSchema));

  if (error) {
    return <div>Error</div>;
  }

  if (isLoading || !questions || !session?.user?.id) {
    return <QuestionSkeltonLoading title={'質問'} subtitle={'すべて'} />;
  }

  return (
    <QuestionPage
      questions={questions}
      currentUserId={session.user.id}
      title={'質問'}
      target={'すべて'}
    />
  );
};

export default QuestionAll;
