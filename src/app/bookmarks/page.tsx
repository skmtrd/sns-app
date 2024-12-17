import { getQuestions } from '@/app/actions/getQuestions';
import QuestionPage from '@/components/question/QuestionPage';
import { Metadata } from 'next';
import { getSession } from '../actions/getSession';
import { getUserInfo } from '../actions/getUserInfo';
export const metadata: Metadata = {
  title: 'ブックマークした質問 / INIAD',
};

const Bookmarks = async () => {
  const [session, questions] = await Promise.all([getSession(), getQuestions()]);
  const userInfo = await getUserInfo(session.id);

  const filteredQuestions = questions.filter((question) =>
    question.likes.some((like) => like.user.id === session.id),
  );

  return (
    <QuestionPage
      currentUserId={session.id}
      initialQuestions={filteredQuestions}
      shouldPolling={false}
      userInfo={userInfo}
    />
  );
};

export default Bookmarks;
