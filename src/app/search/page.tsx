import AssignmentSharePage from '@/components/assignmentshare/AssignmentSharePage';
import QuestionPage from '@/components/question/QuestionPage';
import TimeLinePage from '@/components/timeline/TimeLinePage';
import { getAssignments } from '../actions/getAssignments';
import { getPosts } from '../actions/getPosts';
import { getQuestions } from '../actions/getQuestions';
import { getSession } from '../actions/getSession';
import { getUserInfo } from '../actions/getUserInfo';

const page = async ({
  searchParams,
}: {
  searchParams: { word: string; type: string; tags: string };
}) => {
  const { word, type, tags } = searchParams;
  const tagIds = tags ? tags.split('-') : [];
  const hasTags = tagIds.length > 0;

  if (type === 'ポスト') {
    const [session, posts] = await Promise.all([getSession(), getPosts()]);
    const userInfo = await getUserInfo(session.id);
    const filteredPosts = posts.filter((post) => {
      const matchesTags = !hasTags || post.author.tags?.some((tag) => tagIds.includes(tag.id));
      if (!word) {
        return matchesTags;
      }
      return matchesTags && post.content.toLowerCase().includes(word.toLowerCase());
    });
    return (
      <TimeLinePage
        currentUserId={session.id}
        initialPosts={filteredPosts}
        shouldPolling={false}
        userInfo={userInfo}
      />
    );
  } else if (type === '質問') {
    const [session, questions] = await Promise.all([getSession(), getQuestions()]);
    const userInfo = await getUserInfo(session.id);
    const filteredQuestions = questions.filter((question) => {
      const matchesTags = !hasTags || question.author.tags?.some((tag) => tagIds.includes(tag.id));
      if (!word) {
        return matchesTags;
      }
      return (
        matchesTags &&
        (question.title.toLowerCase().includes(word.toLowerCase()) ||
          question.description.toLowerCase().includes(word.toLowerCase()))
      );
    });
    return (
      <QuestionPage
        currentUserId={session.id}
        initialQuestions={filteredQuestions}
        shouldPolling={false}
        userInfo={userInfo}
      />
    );
  } else if (type === '課題') {
    const [session, assignments] = await Promise.all([getSession(), getAssignments()]);
    const userInfo = await getUserInfo(session.id);
    const filteredAssignments = assignments.filter((assignment) => {
      const matchesTags =
        !hasTags || assignment.author.tags?.some((tag) => tagIds.includes(tag.id));
      if (!word) {
        return matchesTags;
      }
      return (
        matchesTags &&
        (assignment.title.toLowerCase().includes(word.toLowerCase()) ||
          assignment.description.toLowerCase().includes(word.toLowerCase()))
      );
    });
    return (
      <AssignmentSharePage
        currentUserId={session.id}
        initialAssignments={filteredAssignments}
        shouldPolling={false}
        userInfo={userInfo}
      />
    );
  }

  return <div>検索結果</div>;
};

export default page;
