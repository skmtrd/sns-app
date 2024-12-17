import { getAllTags } from '@/app/actions/getAllTags';
import { getSession } from '@/app/actions/getSession';
import { getUserInfo } from '@/app/actions/getUserInfo';
import ProfileEditForm from '@/components/profile/ProfileEditForm';
import { Metadata } from 'next';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'プロフィール編集 / INIAD',
};

const ProfileEditPage = async ({ params }: { params: { id: string } }) => {
  const userInfo = await getUserInfo(params.id);
  if (!userInfo) redirect('/');
  const allTags = await getAllTags();
  const currentUserInfo = await getSession();

  if (userInfo.id !== currentUserInfo.id) {
    redirect(`/profile/${params.id}`);
  }

  return <ProfileEditForm userInfo={userInfo} allTags={allTags} />;
};

export default ProfileEditPage;
