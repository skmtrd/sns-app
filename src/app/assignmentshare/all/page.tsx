'use client';
import AssignmentPost from '@/components/assignmentshare/AssignmentPost';
import Header from '@/components/element/Header';
import FixedHeader from '@/components/layout/FixedHeader';
import useData from '@/hooks/useData';
import { Loader2 } from 'lucide-react';
import { z } from 'zod';

export const assignmentshareSchema = z
  .object({
    id: z.string(),
    title: z.string(),
    description: z.string(),
    deadLine: z.string(),
    authorId: z.string(),
    createdAt: z.string(),
    author: z.object({
      id: z.string(),
      name: z.string(),
      clerkId: z.string(),
      introduction: z.string(),
      tags: z.array(z.object({ id: z.string(), name: z.string() })).optional(),
    }),
    // likes: z.array(
    //   z.object({
    //     author: z.object({ id: z.string(), name: z.string(), clerkId: z.string() }),
    //   }),
    // ),
    // replies: z.array(
    //   z.object({
    //     id: z.string(),
    //     content: z.string(),
    //     createdAt: z.string(),
    //     parentReplyId: z.string().nullable(),
    //     author: z.object({
    //       id: z.string(),
    //       name: z.string(),
    //       clerkId: z.string(),
    //       tags: z.array(z.object({ id: z.string(), name: z.string() })).optional(),
    //     }),
    //   }),
    // ),
  })
  .array();

const TimelineAll = () => {
  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data, error, isLoading } = useData('/api/assignment', assignmentshareSchema);

  if (isLoading) {
    return (
      <div className='flex h-svh w-full flex-1 grow flex-col items-center justify-center gap-4 bg-gray-100'>
        <Loader2 size='64' className='animate-spin text-blue-600' />
        ロード中...
      </div>
    );
  }
  if (error) {
    return <div>Error</div>;
  }

  const scrollToTop = () => {
    const element = document.getElementById('mainContent');
    element?.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div className='flex w-full flex-1 grow flex-col items-center gap-4 overflow-y-scroll bg-gray-100'>
      <FixedHeader title={'課題共有'} target={'すべて'} scrollToTop={scrollToTop} />
      <Header title={''} />
      <div className='flex w-full grow flex-col items-center gap-y-4 p-3'>
        {data.map((assignment) => (
          <AssignmentPost
            key={assignment.id}
            assignmentId={assignment.id}
            title={assignment.title}
            description={assignment.description}
            deadline={assignment.deadLine}
            authorId={assignment.authorId}
            createdAt={assignment.createdAt}
            authorName={assignment.author.name}
            authorClerkId={assignment.author.clerkId}
            authorIntroduction={assignment.author.introduction}
          />
        ))}
      </div>
    </div>
  );
};

export default TimelineAll;
