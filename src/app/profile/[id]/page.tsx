import Header from '@/components/element/Header';
import { Toaster } from 'react-hot-toast';

import { getSession } from '@/app/actions/getSession';
import { getUserInfo } from '@/app/actions/getUserInfo';
import ProfileSkeltonLoading from '@/components/loading/ProfileSkeltonLoading';
import ProfileCard from '@/components/profile/ProfileCard';
import ProfilePost from '@/components/profile/ProfilePost';

const ProfilePage = async () => {
  // const { data: session, update } = useSession();
  //RSCでurlを取得するための処理

  const userInfo = await getUserInfo('cm1oarj240000lge0x1khwwh7');
  const session = await getSession();
  // const { isImageModalOpen, modalSrc, openImageModal, closeImageModal } = useImageModal();

  // useEffect(() => {
  //   update();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  if (!userInfo) {
    return <ProfileSkeltonLoading title={'プロフィール'} subtitle={''} />;
  }

  return (
    <div className='flex h-screen flex-1 flex-col overflow-hidden'>
      <Header title={'プロフィール'} />
      <main className='h-screen overflow-y-auto bg-gray-100'>
        <Toaster />
        <div className='mx-auto max-w-5xl py-8 sm:px-6 lg:px-8'>
          <ProfileCard userInfo={userInfo} session={session} />
          <ProfilePost posts={userInfo.posts} currentUserId={'cm1oarj240000lge0x1khwwh7'} />
        </div>
      </main>
    </div>
  );
};

export default ProfilePage;
