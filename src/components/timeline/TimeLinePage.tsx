'use client';

import { useGetPosts } from '@/hooks/SWR/useGetPosts';
import { useTagTab } from '@/hooks/useTagTab';
import { Post as PostType, Profile } from '@/lib/types';
import FixedHeader from '../layout/FixedHeader';
import TimelineSkeltonLoading from '../loading/TimelineSkeltonLoading';
import { Post } from './Post';

type TimeLinePageProps = {
  initialPosts: PostType[];
  currentUserId: string;
  shouldPolling: boolean;
  userInfo: Profile;
};

const fetcher = (url: string) => fetch(url).then((res) => res.json());
const TimeLinePage: React.FC<TimeLinePageProps> = ({
  initialPosts,
  currentUserId,
  shouldPolling,
  userInfo,
}) => {
  const { data, error, isLoading } = useGetPosts(shouldPolling, initialPosts);
  const posts = data || initialPosts;
  const { currentTagId, handleTagClick } = useTagTab();

  const filteredPosts =
    currentTagId === 'all'
      ? posts
      : posts.filter((post) => post.author.tags?.some((tag) => tag.id === currentTagId));

  if (!posts || isLoading)
    return <TimelineSkeltonLoading title={'タイムライン'} subtitle={'すべて'} />;

  return (
    <div
      id='mainContent'
      className='flex w-full flex-1 grow flex-col items-center overflow-y-scroll bg-gray-100'
    >
      <FixedHeader
        userInfo={userInfo}
        handleTagClick={handleTagClick}
        currentTagId={currentTagId}
      />
      <div className='mx-auto mt-16 w-full max-w-5xl py-8 sm:px-6 lg:px-8'>
        <div className='flex flex-col items-center space-y-6'>
          {filteredPosts.map((post) => (
            <Post key={post.id} currentUserId={currentUserId} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TimeLinePage;
