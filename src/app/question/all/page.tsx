'use client';
import Header from '@/components/element/Header';
import FixedHeader from '@/components/layout/FixedHeader';
import QuestionPost from '@/components/question/QuestionPost';
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

const dummyData = [
  {
    id: 'sadiuaasndiojasa783h3',
    title: '夏休みの期間',
    description: '東洋大学の夏休みはいつまでですか？',
    author: {
      name: 'sakamoto',
      id: 'sadiuaasndiojasa783h3',
      clerkId: 'sadiuaasndiojasa783h3',
      tags: [
        {
          name: '東洋大学',
          id: 'sadiuaasndiojasa783h3',
        },
      ],
    },
    createdAt: '2021-08-01T12:00:00',
    answers: [
      {
        id: 'sadiuaasndiojasa783h3',
        name: 'sakamoto',
        content: '東洋大学の学生に夏休みはありません。勉強してください。',
      },
    ],
  },
  {
    id: 'dwasuidhuwhadj0as',
    title: 'INIADとは',
    description: 'INIADってなんですか？なんかの略称ですか？',
    author: {
      name: 'sakamoto',
      id: 'sadiuaasndiojasa783h3',
      clerkId: 'sadiuaasndiojasa783h3',
      tags: [
        {
          name: '東洋大学',
          id: 'sadiuaasndiojasa783h3',
        },
      ],
    },
    createdAt: '2021-08-01T12:00:00',
    answers: [
      {
        id: 'sadiuaasndiojasa783h3',
        name: 'Asano Ryosuke',
        content:
          '東洋大学情報連携学部のことです。しっかり覚えてください。ちにみに「Information Networking for Innovation and Design」の略称です。',
      },
    ],
  },
];

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

  //   const posts = postSchema.array().parse(data.data);

  return (
    <div className='flex w-full flex-1 grow flex-col items-center gap-4 overflow-y-scroll bg-gray-100'>
      <FixedHeader title={'質問'} target={'すべて'} />
      <Header title={''} />
      <div className='flex w-full grow flex-col items-center gap-y-4 p-3'>
        {/* {posts.map((post, index) => (
          <Post
            key={index}
            username={post.author.name}
            clerkId={post.author.clerkId}
            id={post.author.id}
            timestamp={post.createdAt}
            content={post.content}
            tags={post.author.tags}
            postId={post.id}
          />
        ))} */}
        {dummyData.map((post, index) => (
          <QuestionPost key={index} post={post} />
        ))}
      </div>
    </div>
  );
};

export default TimelineAll;
