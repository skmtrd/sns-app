import { getSession } from '@/app/actions/getSession';
import QuestionPage from '@/components/question/QuestionPage';
import { Metadata } from 'next';
import { revalidatePath } from 'next/cache';
import { getQuestions } from '../actions/getQuestions';
import { getUserInfo } from '../actions/getUserInfo';

export const metadata: Metadata = {
  title: '質問 / INIAD',
};

const QuestionAll = async () => {
  const [session, questions] = await Promise.all([getSession(), getQuestions()]);
  const userInfo = await getUserInfo(session.id);
  revalidatePath('/question');

  return (
    <QuestionPage
      currentUserId={session.id}
      initialQuestions={questions}
      shouldPolling={true}
      userInfo={userInfo}
    />
  );
};

export default QuestionAll;
