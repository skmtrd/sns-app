'use client';
import Header from '@/components/element/Header';
import FixedHeader from '@/components/layout/FixedHeader';
import QuestionSkeltonLoading from '@/components/loading/QuestionSkeltonLoading';
import QuestionPost from '@/components/question/QuestionPost';
import useData from '@/hooks/useData';
import { containsAllWords } from '@/lib/containAllWords';
import { deleteQuestion } from '@/lib/deleteRequests';
import { questionSchema } from '@/lib/schemas';
import { scrollToTop } from '@/lib/scrollToTop';
import { useAuth } from '@clerk/nextjs';
import { usePathname } from 'next/navigation';
import { useSWRConfig } from 'swr';

const QuestionSearched = () => {
  const { mutate } = useSWRConfig();
  const { userId: currentClerkId } = useAuth();
  const { data: questions, error, isLoading } = useData('/api/question', questionSchema);
  const pathName = usePathname();
  const searchedWord = decodeURIComponent(pathName.split('/search/')[1]).trim();
  const searchWords = searchedWord.split(' ').filter((term) => term.trim() !== '');

  if (error) {
    return <div>Error</div>;
  }

  if (isLoading || !questions || !currentClerkId) {
    return <QuestionSkeltonLoading title={'質問'} subtitle={`検索-"${searchWords}"`} />;
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
        '/api/question',
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

  const filteredQuestions = questions.filter((question) =>
    containsAllWords(question.description, searchWords),
  );

  return (
    <div
      id='mainContent'
      className='flex w-full flex-1 grow flex-col items-center gap-4 overflow-y-scroll bg-gray-100'
    >
      <FixedHeader title={'質問'} target={`検索-"${searchWords}"`} scrollToTop={scrollToTop} />
      <Header title={''} />
      <div className='flex w-full grow flex-col items-center gap-y-4 p-3'>
        {filteredQuestions.map((question) => (
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

export default QuestionSearched;
