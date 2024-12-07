import { getQuestions } from '@/app/actions/getQuestions';
import QuestionPage from '@/components/question/QuestionPage';
import { getSession } from '../actions/getSession';

const Bookmarks = async () => {
  const questions = await getQuestions();
  const session = await getSession();

  const filteredQuestions = questions.filter((question) =>
    question.likes.some((like) => like.user.id === session.id),
  );

  return (
    <QuestionPage
      currentUserId={session.id}
      initialQuestions={filteredQuestions}
      title={'ブックマークした質問'}
      target={null}
      shouldPolling={false}
    />
  );
};

export default Bookmarks;
