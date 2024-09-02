import { scrollToTop } from '@/lib/scrollToTop';
import { Posts as PostsType } from '@/lib/types';
import FixedHeader from '../layout/FixedHeader';
import { Post } from './Post';

type TimeLinePageProps = {
  posts: PostsType;
  handleDeletePost: (e: React.MouseEvent<HTMLButtonElement>, postId: string) => void;
  currentClerkId: string;
  title: string;
  target: string;
};

const TimeLinePage: React.FC<TimeLinePageProps> = ({
  posts,
  handleDeletePost,
  currentClerkId,
  title,
  target,
}) => {
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

export default TimeLinePage;
