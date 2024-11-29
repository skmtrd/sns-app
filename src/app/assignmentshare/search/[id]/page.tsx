// 'use client';
// import AssignmnetSharePage from '@/components/assignmentshare/AssignmnetSharePage';
// import QuestionSkeltonLoading from '@/components/loading/QuestionSkeltonLoading';
// import useData from '@/hooks/useData';
// import { containsAllWords } from '@/lib/containAllWords';
// import { AssignmentSchema } from '@/lib/schemas';
// import { useAuth } from '@clerk/nextjs';
// import { usePathname } from 'next/navigation';
// import { useSWRConfig } from 'swr';
// import { z } from 'zod';

// const AssignmentSearched = () => {
//   const fetcher = (url: string) => fetch(url).then((res) => res.json());
//   const {
//     data: assignments,
//     error,
//     isLoading,
//   } = useData('/api/assignment', z.array(AssignmentSchema));
//   const { userId: currentClerkId } = useAuth();
//   const { mutate } = useSWRConfig();
//   const pathName = usePathname();
//   const searchedWord = decodeURIComponent(pathName.split('/search/')[1]).trim();
//   const searchWords = searchedWord.split(' ').filter((term) => term.trim() !== '');

//   if (isLoading) {
//     return <QuestionSkeltonLoading title={'課題共有'} subtitle={`検索-"${searchWords}"`} />;
//   }

//   if (error || !assignments || !currentClerkId) {
//     return <div>Error</div>;
//   }

//   const filteredAssignments = assignments.filter((assignment) =>
//     containsAllWords(assignment.description, searchWords),
//   );

//   return (
//     <AssignmnetSharePage
//       currentClerkId={currentClerkId}
//       assignments={filteredAssignments}
//       title={'課題共有'}
//       target={`検索-"${searchWords}"`}
//     />
//   );
// };

// export default AssignmentSearched;
