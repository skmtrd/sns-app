import { getQuestions } from '@/app/actions/getQuestions';
import { getSession } from '@/app/actions/getSession';
import { getUserInfo } from '@/app/actions/getUserInfo';
import QuestionPage from '@/components/question/QuestionPage';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '質問 / INIAD',
};

const QuestionAll = async () => {
  const [session, questions] = await Promise.all([getSession(), getQuestions()]);
  const userInfo = await getUserInfo(session.id);

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
