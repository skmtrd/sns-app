import { getAssignments } from '@/app/actions/getAssignmnets';
import { getSession } from '@/app/actions/getSession';
import QuestionPage from '@/components/question/QuestionPage';
import { Metadata } from 'next';
import { revalidatePath } from 'next/cache';
import { getUserInfo } from '../actions/getUserInfo';

export const metadata: Metadata = {
  title: '質問 / INIAD',
};

const QuestionAll = async () => {
  const [session, assignments] = await Promise.all([getSession(), getAssignments()]);
  const userInfo = await getUserInfo(session.id);
  revalidatePath('/question');

  return (
    <QuestionPage
      currentUserId={session.id}
      initialQuestions={assignments}
      shouldPolling={true}
      userInfo={userInfo}
    />
  );
};

export default QuestionAll;
