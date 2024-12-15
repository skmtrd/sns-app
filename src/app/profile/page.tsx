import { redirect } from 'next/navigation';
import { getUserId } from '../api/lib/getUserId';

const page = async () => {
  const userId = await getUserId();
  redirect(`/profile/${userId}`);

  return <div></div>;
};

export default page;
