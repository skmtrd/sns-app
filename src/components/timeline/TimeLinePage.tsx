import { useDeletePost } from '@/hooks/useDeletePost';
import { scrollToTop } from '@/lib/scrollToTop';
import { Post as PostType } from '@/lib/types';
import FixedHeader from '../layout/FixedHeader';
import { Post } from './Post';

type TimeLinePageProps = {
  posts: PostType[];
  currentClerkId: string;
  title: string;
  target: string | null;
};

const TimeLinePage: React.FC<TimeLinePageProps> = ({ posts, currentClerkId, title, target }) => {
  const handleDeletePost = useDeletePost(posts);
  return (
    <div
      id='mainContent'
      className='flex w-full flex-1 grow flex-col items-center gap-4 overflow-y-scroll bg-gray-100'
    >
      <FixedHeader title={title} target={target} scrollToTop={scrollToTop} />
      <div className='mt-10 flex w-full grow flex-col items-center gap-y-4 p-3'>
        {posts.map((post) => (
          <Post
            key={post.id}
            // postId={post.id}
            // postContent={post.content}
            // timestamp={post.createdAt}
            // likes={post.likes}
            // replyCount={post.replies.filter((reply) => reply.parentReplyId === null).length}
            // postAuthorName={post.author.name}
            // postAuthorId={post.author.id}
            // postAuthorClerkId={post.author.clerkId}
            // postAuthorIntroduction={post.author.introduction}
            // postAuthorTags={post.author.tags}
            // postAuthorAvatar={post.avatar}
            handleDeletePost={handleDeletePost}
            currentClerkId={currentClerkId}
            post={post}
          />
        ))}
      </div>
    </div>
  );
};

export default TimeLinePage;
