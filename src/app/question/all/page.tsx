'use client';
import Header from '@/components/element/Header';
import FixedHeader from '@/components/layout/FixedHeader';
import QuestionPost from '@/components/question/QuestionPost';
import useData from '@/hooks/useData';
import { questionSchema } from '@/lib/schemas';
import { LoaderCircle } from 'lucide-react';

const TimelineAll = () => {
  const { data: questions, error, isLoading } = useData('/api/question', questionSchema);

  if (error) {
    return <div>Error</div>;
  }

  if (isLoading || !questions) {
    return (
      <div className='flex h-svh w-full flex-1 grow flex-col items-center justify-center gap-4 bg-gray-100'>
        <LoaderCircle size='64' className='animate-spin text-blue-600' />
        ロード中...
      </div>
    );
  }

  const scrollToTop = () => {
    const element = document.getElementById('mainContent');
    element?.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div
      id='mainContent'
      className='flex w-full flex-1 grow flex-col items-center gap-4 overflow-y-scroll bg-gray-100'
    >
      <FixedHeader title={'質問'} target={'すべて'} scrollToTop={scrollToTop} />
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
            // tags={question.author.tags}
          />
        ))}
      </div>
    </div>
  );
};

export default TimelineAll;
