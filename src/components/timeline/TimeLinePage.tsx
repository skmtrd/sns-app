import { useDeletePost } from '@/hooks/DeleteContent/useDeletePost';
import { scrollToTop } from '@/lib/scrollToTop';
import { Post as PostType } from '@/lib/types';
import FixedHeader from '../layout/FixedHeader';
import { Post } from './Post';

type TimeLinePageProps = {
  posts: PostType[];
  currentUserId: string;
  title: string;
  target: string | null;
};

const TimeLinePage: React.FC<TimeLinePageProps> = ({ posts, currentUserId, title, target }) => {
  const handleDeletePost = useDeletePost(posts);
  return (
    <div
      id='mainContent'
      className='flex w-full flex-1 grow flex-col items-center overflow-y-scroll bg-gray-100'
    >
      <FixedHeader title={title} target={target} scrollToTop={scrollToTop} />
      <div className='mx-auto mt-10 w-full max-w-5xl py-8 sm:px-6 lg:px-8'>
        <div className='flex flex-col items-center space-y-6'>
          {posts.map((post) => (
            <Post
              key={post.id}
              handleDeletePost={handleDeletePost}
              currentUserId={currentUserId}
              post={post}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TimeLinePage;
