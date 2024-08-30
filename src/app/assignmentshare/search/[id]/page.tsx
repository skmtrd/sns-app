'use client';
import AssignmentPost from '@/components/assignmentshare/AssignmentPost';
import Header from '@/components/element/Header';
import FixedHeader from '@/components/layout/FixedHeader';
import QuestionSkeltonLoading from '@/components/loading/QuestionSkeltonLoading';
import useData from '@/hooks/useData';
import { containsAllWords } from '@/lib/containAllWords';
import { assignmentshareSchema } from '@/lib/schemas';
import { scrollToTop } from '@/lib/scrollToTop';
import { usePathname } from 'next/navigation';

const AssignmentSearched = () => {
  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data: assignments, error, isLoading } = useData('/api/assignment', assignmentshareSchema);
  const pathName = usePathname();
  const searchedWord = decodeURIComponent(pathName.split('/search/')[1]).trim();
  const searchWords = searchedWord.split(' ').filter((term) => term.trim() !== '');

  if (isLoading) {
    return <QuestionSkeltonLoading title={'課題共有'} subtitle={`検索-"${searchWords}"`} />;
  }

  if (error || !assignments) {
    return <div>Error</div>;
  }

  const filteredAssignments = assignments.filter((assignment) =>
    containsAllWords(assignment.description, searchWords),
  );

  return (
    <div
      id='mainContent'
      className='flex w-full flex-1 grow flex-col items-center gap-4 overflow-y-scroll bg-gray-100'
    >
      <FixedHeader title={'課題共有'} target={`検索-"${searchWords}"`} scrollToTop={scrollToTop} />
      <Header title={''} />
      <div className='flex w-full grow flex-col items-center gap-y-1 p-3'>
        {assignments.map((assignment) => (
          <AssignmentPost
            key={assignment.id}
            assignmentId={assignment.id}
            title={assignment.title}
            description={assignment.description}
            deadline={assignment.deadLine}
            likes={assignment.likes}
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

export default AssignmentSearched;
