import { getAllTags } from '@/app/actions/getAllTags';
import { getSession } from '@/app/actions/getSession';
import { getUserInfo } from '@/app/actions/getUserInfo';
import ProfileEditForm from '@/components/profile/ProfileEditForm';
import { redirect } from 'next/navigation';

const ProfileEditPage = async ({ params }: { params: { id: string } }) => {
  const userInfo = await getUserInfo(params.id);
  const allTags = await getAllTags();
  const currentUserInfo = await getSession();

  if (userInfo.id !== currentUserInfo.id) {
    redirect(`/profile/${params.id}`);
  }

  return <ProfileEditForm userInfo={userInfo} allTags={allTags} />;
};

export default ProfileEditPage;
