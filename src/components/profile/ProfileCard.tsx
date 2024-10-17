'use client';
import { useImageModal } from '@/hooks/useImageModal';
import { ICON_IMAGE_BASE_URL } from '@/lib/constants';
import { ProfileSchema, SessionSchema } from '@/lib/schemas';
import Image from 'next/image';
import { z } from 'zod';
import Button from '../element/Button';
import { ImageDisplayModal } from '../element/ImageDisplayModal';
import UserTag from '../element/UserTag';

type userInfo = z.infer<typeof ProfileSchema>;
type session = z.infer<typeof SessionSchema>;

const ProfileCard = ({ userInfo, session }: { userInfo: userInfo; session: session }) => {
  const { isImageModalOpen, modalSrc, openImageModal, closeImageModal } = useImageModal();
  const imageUrl = userInfo.iconUrl
    ? `${ICON_IMAGE_BASE_URL}${userInfo.iconUrl}`
    : userInfo.image
      ? userInfo.image
      : '';
  return (
    <div className='mx-2 mb-8 rounded-lg bg-white p-6 shadow sm:p-8'>
      {isImageModalOpen && <ImageDisplayModal src={modalSrc} closeModal={closeImageModal} />}
      <div className='flex flex-col gap-6 sm:flex sm:flex-row sm:gap-10'>
        <button
          onClick={(e) => {
            e.stopPropagation();
            openImageModal(imageUrl);
          }}
          className='size-36'
        >
          <Image
            src={imageUrl}
            alt={`${userInfo.name}のアバター`}
            width={144}
            height={144}
            className='min-h-36 min-w-36 rounded-full'
          />
        </button>
        <div className='flex max-w-full grow flex-col justify-evenly gap-3 sm:gap-0'>
          <div>
            <p className='text-2xl font-bold'>{userInfo.name}</p>
            <p className='text-gray-500'>@{userInfo.id}</p>
          </div>
          <div className='max-w-full break-words'>{userInfo.introduction}</div>
        </div>
      </div>
      <div className='h-5' />
      <div className='flex w-full flex-wrap'>
        {userInfo.tags.map((tag, index) => (
          <UserTag key={tag.id} tagName={tag.name} />
        ))}
      </div>
      {session.id === userInfo.id && (
        <div className='flex w-full justify-end'>
          <Button title={'編集'} href={`${userInfo.id}/edit`} />
        </div>
      )}
    </div>
  );
};

export default ProfileCard;
