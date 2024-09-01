'use client';
import Header from '@/components/element/Header';
import FixedHeader from '@/components/layout/FixedHeader';
import TimelineSkeltonLoading from '@/components/loading/TimelineSkeltonLoading';
import { Post } from '@/components/timeline/Post';
import useData from '@/hooks/useData';
import { deletePost } from '@/lib/deleteRequests';
import { postSchema } from '@/lib/schemas';
import { scrollToTop } from '@/lib/scrollToTop';
import { useAuth } from '@clerk/nextjs';
import { useSWRConfig } from 'swr';

const Likes = () => {
  const { mutate } = useSWRConfig();
  const { userId: currentClerkId } = useAuth();
  const { data: posts, error, isLoading } = useData(`/api/like/post/${currentClerkId}`, postSchema);

  if (error && error.status === 429) {
    setTimeout(() => {
      mutate(`/api/like/post/${currentClerkId}`);
    }, 5000);
  } else if (error) {
    return <div>Error</div>;
  }

  const handleDeletePost = async (e: React.MouseEvent<HTMLButtonElement>, postId: string) => {
    e.stopPropagation();
    if (!posts) return;
    const optimisticData = posts.filter((post) => post.id !== postId);
    try {
      await mutate(
        `/api/like/post/${currentClerkId}`,
        async () => {
          await deletePost(postId);
          return optimisticData;
        },
        {
          optimisticData,
          revalidate: false,
          populateCache: true,
          rollbackOnError: true,
        },
      );
    } catch (error) {
      console.error('Failed to delete post:', error);
    }
  };

  if (isLoading || !posts || !currentClerkId) {
    return <TimelineSkeltonLoading title={'タイムライン'} subtitle={'すべて'} />;
  }

  return (
    <div
      id='mainContent'
      className='flex w-full flex-1 grow flex-col items-center gap-4 overflow-y-scroll bg-gray-100'
    >
      <FixedHeader title={'いいねしたポスト'} target={null} scrollToTop={scrollToTop} />
      <Header title={''} />
      <div className='flex w-full grow flex-col items-center gap-y-4 p-3'>
        {posts.map((post) => (
          <Post
            key={post.id}
            postId={post.id}
            postContent={post.content}
            timestamp={post.createdAt}
            likes={post.likes}
            replyCount={post.replies.filter((reply) => reply.parentReplyId === null).length}
            postAuthorName={post.author.name}
            postAuthorId={post.author.id}
            postAuthorClerkId={post.author.clerkId}
            postAuthorIntroduction={post.author.introduction}
            postAuthorTags={post.author.tags}
            postAuthorAvatar={post.avatar}
            handleDeletePost={handleDeletePost}
            currentClerkId={currentClerkId}
          />
        ))}
      </div>
    </div>
  );
};

export default Likes;
