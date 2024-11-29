// 'use client';
// import QuestionSkeltonLoading from '@/components/loading/QuestionSkeltonLoading';
// import QuestionPage from '@/components/question/QuestionPage';
// import useData from '@/hooks/useData';
// import { containsAllWords } from '@/lib/containAllWords';
// import { QuestionSchema } from '@/lib/schemas';
// import { useAuth } from '@clerk/nextjs';
// import { usePathname } from 'next/navigation';
// import { z } from 'zod';

// const QuestionSearched = () => {
//   const { userId: currentClerkId } = useAuth();
//   const { data: questions, error, isLoading } = useData('/api/question', z.array(QuestionSchema));
//   const pathName = usePathname();
//   const searchedWord = decodeURIComponent(pathName.split('/search/')[1]).trim();
//   const searchWords = searchedWord.split(' ').filter((term) => term.trim() !== '');

//   if (error) {
//     return <div>Error</div>;
//   }

//   if (isLoading || !questions || !currentClerkId) {
//     return <QuestionSkeltonLoading title={'質問'} subtitle={`ワード検索-"${searchWords}"`} />;
//   }

//   const filteredQuestions = questions.filter((question) =>
//     containsAllWords(question.description, searchWords),
//   );

//   return (
//     <QuestionPage
//       questions={filteredQuestions}
//       currentClerkId={currentClerkId}
//       title={'質問'}
//       target={`ワード検索-"${searchWords}"`}
//     />
//   );
// };

// export default QuestionSearched;
