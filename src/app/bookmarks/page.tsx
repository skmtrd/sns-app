import { getQuestions } from '@/app/actions/getQuestions';
import QuestionPage from '@/components/question/QuestionPage';
import { auth } from '../../../auth';

const Bookmarks = async () => {
  const questions = await getQuestions();
  const session = await auth();

  const filteredQuestions = questions.filter((question) =>
    question.likes.some((like) => like.user.id === session?.user?.id),
  );

  return (
    <QuestionPage
      currentUserId={session?.user?.id ?? ''}
      initialQuestions={filteredQuestions}
      title={'ブックマークした質問'}
      target={null}
      shouldPolling={false}
    />
  );
};

export default Bookmarks;
