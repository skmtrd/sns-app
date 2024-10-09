import { Post as PostType } from '@/lib/types';
import { Post } from '../timeline/Post';

type ProfilePostProps = {
  posts: PostType[];
  currentUserId: string;
};

const ProfilePost: React.FC<ProfilePostProps> = ({ posts, currentUserId }) => {
  return (
    <div className='w-full'>
      <h2 className='mx-6 mb-6 border-b pb-3 text-2xl font-semibold'>投稿一覧</h2>
      <div className='flex flex-col items-center space-y-6'>
        {posts.length > 0 ? (
          posts.map((post) => <Post key={post.id} currentUserId={currentUserId} post={post} />)
        ) : (
          <p className='py-6 text-center text-lg text-gray-500'>投稿がありません</p>
        )}
      </div>
    </div>
  );
};

export default ProfilePost;
