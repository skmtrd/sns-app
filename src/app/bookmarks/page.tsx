'use client';
import Header from '@/components/element/Header';
import FixedHeader from '@/components/layout/FixedHeader';
import QuestionSkeltonLoading from '@/components/loading/QuestionSkeltonLoading';
import QuestionPost from '@/components/question/QuestionPost';
import useData from '@/hooks/useData';
import { deleteQuestion } from '@/lib/deleteRequests';
import { questionSchema } from '@/lib/schemas';
import { scrollToTop } from '@/lib/scrollToTop';
import { useAuth } from '@clerk/nextjs';
import { useSWRConfig } from 'swr';

const bookmarks = () => {
  const { mutate } = useSWRConfig();
  const { userId: currentClerkId } = useAuth();
  const {
    data: questions,
    error,
    isLoading,
  } = useData(`/api/like/question/${currentClerkId}`, questionSchema);

  if (error) {
    return <div>Error</div>;
  }

  if (isLoading || !questions || !currentClerkId) {
    return <QuestionSkeltonLoading title={'質問'} subtitle={'すべて'} />;
  }

  const handleDeleteQuestion = async (
    e: React.MouseEvent<HTMLButtonElement>,
    questionId: string,
  ) => {
    e.stopPropagation();
    if (!questions) return;
    const optimisticData = questions.filter((question) => question.id !== questionId);
    try {
      await mutate(
        `/api/like/question/${currentClerkId}`,
        async () => {
          await deleteQuestion(questionId);
          return optimisticData;
        },
        {
          optimisticData,
          revalidate: false,
          populateCache: true,
          rollbackOnError: true,
        },
      );
    } catch (error) {
      console.error('Failed to delete post:', error);
    }
  };

  return (
    <div
      id='mainContent'
      className='flex w-full flex-1 grow flex-col items-center gap-4 overflow-y-scroll bg-gray-100'
    >
      <FixedHeader title={'ブックマーク'} target={null} scrollToTop={scrollToTop} />
      <Header title={''} />
      <div className='flex w-full grow flex-col items-center gap-y-4 p-3'>
        {questions.map((question) => (
          <QuestionPost
            key={question.id}
            questionId={question.id}
            questionTitle={question.title}
            questionDescription={question.description}
            replies={question.replies}
            questionAuthorName={question.author.name}
            questionAuthorId={question.author.id}
            questionAuthorClerkId={question.author.clerkId}
            timestamp={question.createdAt}
            likes={question.likes}
            handleDeletePost={handleDeleteQuestion}
            currentClerkId={currentClerkId}
          />
        ))}
      </div>
    </div>
  );
};

export default bookmarks;
