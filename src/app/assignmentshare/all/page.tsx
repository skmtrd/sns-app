'use client';
import AssignmentPost from '@/components/assignmentshare/AssignmentPost';
import Header from '@/components/element/Header';
import FixedHeader from '@/components/layout/FixedHeader';
import useData from '@/hooks/useData';
import { assignmentshareSchema } from '@/lib/schemas';
import { scrollToTop } from '@/lib/scrollToTop';
import { Loader2 } from 'lucide-react';

const TimelineAll = () => {
  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data: assignments, error, isLoading } = useData('/api/assignment', assignmentshareSchema);

  if (isLoading) {
    return (
      <div className='flex h-svh w-full flex-1 grow flex-col items-center justify-center gap-4 bg-gray-100'>
        <Loader2 size='64' className='animate-spin text-blue-600' />
        ロード中...
      </div>
    );
  }
  if (error || !assignments) {
    return <div>Error</div>;
  }

  return (
    <div
      id='mainContent'
      className='flex w-full flex-1 grow flex-col items-center gap-4 overflow-y-scroll bg-gray-100'
    >
      <FixedHeader title={'課題共有'} target={'すべて'} scrollToTop={scrollToTop} />
      <Header title={''} />
      <div className='flex w-full grow flex-col items-center gap-y-1 p-3'>
        {assignments.map((assignment) => (
          <AssignmentPost
            key={assignment.id}
            assignmentId={assignment.id}
            title={assignment.title}
            description={assignment.description}
            deadline={assignment.deadLine}
            timestamp={assignment.createdAt}
            assignmentAuthorId={assignment.authorId}
            assignmentAuthorName={assignment.author.name}
            assignmentAuthorClerkId={assignment.author.clerkId}
            assignmentAuthorIntroduction={assignment.author.introduction}
          />
        ))}
      </div>
    </div>
  );
};

export default TimelineAll;
