'use client';
import Header from '@/components/element/Header';
import FixedHeader from '@/components/layout/FixedHeader';
import QuestionPost from '@/components/question/QuestionPost';
import useData from '@/hooks/useData';
import { LoaderCircle } from 'lucide-react';
import { z } from 'zod';

export const questionSchema = z
  .object({
    author: z.object({
      name: z.string(),
      id: z.string(),
      clerkId: z.string(),
      tags: z.array(z.object({ name: z.string(), id: z.string() })),
    }),
    createdAt: z.string(),
    id: z.string(),
    title: z.string(),
    description: z.string(),
    replies: z.array(
      z.object({ id: z.string(), content: z.string(), author: z.object({ name: z.string() }) }),
    ),
  })
  .array();

const TimelineAll = () => {
  const { data, error, isLoading } = useData('/api/question', questionSchema);

  if (error) {
    return <div>Error</div>;
  }

  if (isLoading || !data) {
    return (
      <div className='flex h-svh w-full flex-1 grow flex-col items-center justify-center gap-4 bg-gray-100'>
        <LoaderCircle size='64' className='animate-spin text-blue-600' />
        ロード中...
      </div>
    );
  }

  return (
    <div className='flex w-full flex-1 grow flex-col items-center gap-4 overflow-y-scroll bg-gray-100'>
      <FixedHeader title={'質問'} target={'すべて'} />
      <Header title={''} />
      <div className='flex w-full grow flex-col items-center gap-y-4 p-3'>
        {data.map((question, index) => (
          <QuestionPost
            key={index}
            title={question.title}
            description={question.description}
            replies={question.replies}
            username={question.author.name}
            clerkId={question.author.clerkId}
            id={question.author.id}
            timestamp={question.createdAt}
            // tags={question.author.tags}
            postId={question.id}
          />
        ))}
      </div>
    </div>
  );
};

export default TimelineAll;
