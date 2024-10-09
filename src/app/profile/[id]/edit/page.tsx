import { getSession } from '@/app/actions/getSession';
import { getUserInfo } from '@/app/actions/getUserInfo';
import ProfileEditForm from '@/components/profile/ProfileEditForm';
import { redirect } from 'next/navigation';

const ProfileEditPage = async ({ params }: { params: { id: string } }) => {
  const userInfo = await getUserInfo(params.id);
  const currentUserInfo = await getSession();

  if (userInfo.id !== currentUserInfo.id) {
    redirect(`/profile/${params.id}`);
  }

  return <ProfileEditForm userInfo={userInfo} />;
};

export default ProfileEditPage;
