'use client';
import Header from '@/components/element/Header';
import FixedHeader from '@/components/layout/FixedHeader';
import QuestionSkeltonLoading from '@/components/loading/QuestionSkeltonLoading';
import QuestionPost from '@/components/question/QuestionPost';
import useData from '@/hooks/useData';
import { questionSchema } from '@/lib/schemas';

const TimelineAll = () => {
  const { data: questions, error, isLoading } = useData('/api/question', questionSchema);

  if (error) {
    return <div>Error</div>;
  }

  if (isLoading || !questions) {
    return <QuestionSkeltonLoading title={'質問'} subtitle={'すべて'} />;
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
            likes={question.likes}
          />
        ))}
      </div>
    </div>
  );
};

export default TimelineAll;
