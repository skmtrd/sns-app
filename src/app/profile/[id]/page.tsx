import { getSession } from '@/app/actions/getSession';
import { getUserInfo } from '@/app/actions/getUserInfo';
import Header from '@/components/element/Header';
import ProfileSkeltonLoading from '@/components/loading/ProfileSkeltonLoading';
import ProfileCard from '@/components/profile/ProfileCard';
import ProfilePost from '@/components/profile/ProfilePost';
import { Toaster } from 'react-hot-toast';

const ProfilePage = async ({ params }: { params: { id: string } }) => {
  const session = await getSession();
  const userInfo = await getUserInfo(params.id);
  if (!userInfo) {
    return <ProfileSkeltonLoading title={'プロフィール'} subtitle={''} />;
  }

  return (
    <div className='flex h-screen flex-1 flex-col overflow-hidden'>
      <Header title={'プロフィール'} />
      <main className='h-screen overflow-y-auto bg-gray-100'>
        <Toaster />
        <div className='mx-auto max-w-5xl py-8 sm:px-6 lg:px-8'>
          <ProfileCard userInfo={userInfo} currentUserId={session.id} />
          <ProfilePost posts={userInfo.posts} currentUserId={session?.id} />
        </div>
      </main>
    </div>
  );
};

export default ProfilePage;
