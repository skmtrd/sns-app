'use client';
import AssignmentPost from '@/components/assignmentshare/AssignmentPost';
import Header from '@/components/element/Header';
import FixedHeader from '@/components/layout/FixedHeader';
import { Loader2 } from 'lucide-react';
import useSWR from 'swr';

// export const postSchema = z.object({
//   author: z.object({
//     name: z.string(),
//     id: z.string(),
//     clerkId: z.string(),
//     tags: z.array(z.object({ name: z.string(), id: z.string() })),
//   }),
//   createdAt: z.string(),
//   id: z.string(),
//   content: z.string(),
// });

const TimelineAll = () => {
  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data, error, isLoading } = useSWR('/api/post', fetcher, {
    refreshInterval: 20000,
    revalidateOnFocus: true,
  });

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

  return (
    <div className='flex w-full flex-1 grow flex-col items-center gap-4 overflow-y-scroll bg-gray-100'>
      <FixedHeader title={'課題共有'} target={'すべて'} />
      <Header title={''} />
      <div className='flex w-full grow flex-col items-center gap-y-4 p-3'>
        <AssignmentPost />
      </div>
    </div>
  );
};

export default TimelineAll;
