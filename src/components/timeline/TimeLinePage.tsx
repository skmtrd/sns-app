'use client';

import { getPosts } from '@/app/actions/getPosts';
import { Post as PostType } from '@/lib/types';
import useSWR from 'swr';
import FixedHeader from '../layout/FixedHeader';
import TimelineSkeltonLoading from '../loading/TimelineSkeltonLoading';
import { Post } from './Post';

type TimeLinePageProps = {
  initialPosts: PostType[];
  currentUserId: string;
  title: string;
  target: string | null;
  shouldPolling: boolean;
};

const fetcher = (url: string) => fetch(url).then((res) => res.json());
const TimeLinePage: React.FC<TimeLinePageProps> = ({
  initialPosts,
  currentUserId,
  title,
  target,
  shouldPolling,
}) => {
  const { data, error, isLoading } = useSWR(shouldPolling ? 'getPosts' : null, getPosts, {
    refreshInterval: 10000,
    fallback: initialPosts,
  });
  const posts = data || initialPosts;
  if (!posts || isLoading)
    return <TimelineSkeltonLoading title={'タイムライン'} subtitle={'すべて'} />;
  return (
    <div
      id='mainContent'
      className='flex w-full flex-1 grow flex-col items-center overflow-y-scroll bg-gray-100'
    >
      <FixedHeader title={title} target={target} />
      <div className='mx-auto mt-10 w-full max-w-5xl py-8 sm:px-6 lg:px-8'>
        <div className='flex flex-col items-center space-y-6'>
          {posts.map((post) => (
            <Post key={post.id} currentUserId={currentUserId} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TimeLinePage;
