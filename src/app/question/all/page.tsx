import { getAssignments } from '@/app/actions/getAssignmnets';
import { getSession } from '@/app/actions/getSession';
import QuestionPage from '@/components/question/QuestionPage';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '質問 / INIAD',
};

const QuestionAll = async () => {
  const assignments = await getAssignments();
  const session = await getSession();

  return (
    <QuestionPage
      currentUserId={session.id}
      initialQuestions={assignments}
      title={'質問'}
      target={'すべて'}
      shouldPolling={true}
    />
  );
};

export default QuestionAll;
