import { getAssignments } from '@/app/actions/getAssignmnets';
import QuestionPage from '@/components/question/QuestionPage';
import { auth } from '../../../../auth';

const QuestionAll = async () => {
  const assignments = await getAssignments();
  const session = await auth();
  return (
    <QuestionPage
      currentUserId={session?.user?.id ?? ''}
      initialQuestions={assignments}
      title={'質問'}
      target={'すべて'}
      shouldPolling={true}
    />
  );
};

export default QuestionAll;
