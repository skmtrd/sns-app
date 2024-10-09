'use client';
import { useImageModal } from '@/hooks/useImageModal';
import { ICON_IMAGE_BASE_URL } from '@/lib/constants';
import { ProfileSchema, SessionSchema } from '@/lib/schemas';
import { Tag } from '@prisma/client';
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
      <div className='mb-6 flex flex-col items-center sm:flex-row sm:items-start'>
        <div className='mb-4 sm:mb-0 sm:mr-6'>
          <button
            onClick={(e) => {
              e.stopPropagation();
              openImageModal(imageUrl);
            }}
          >
            <Image
              src={imageUrl}
              alt={`${userInfo.name}のアバター`}
              width={120}
              height={120}
              className='rounded-full'
            />
          </button>
        </div>
        <div className='flex-1 text-center sm:text-left'>
          <h1 className='mb-2 text-4xl font-bold text-gray-900 sm:text-3xl'>{userInfo?.name}</h1>
          <p className='mb-2 text-base text-gray-500 sm:text-lg'>@{userInfo?.id}</p>
          <p className='mb-4 break-words text-base text-gray-700 sm:text-lg'>
            {userInfo?.introduction}
          </p>
          <div className='mb-4'>
            <div className='flex flex-wrap gap-2'>
              {userInfo?.tags && userInfo?.tags.length > 0 ? (
                userInfo?.tags.map((tag: Tag) => <UserTag key={tag.id} tagName={tag.name} />)
              ) : (
                <p className='text-base text-gray-500'>タグが設定されていません</p>
              )}
            </div>
          </div>
        </div>
      </div>
      {session.id === userInfo.id && (
        <div className='flex w-full justify-center sm:justify-end'>
          <Button title={'プロフィール編集'} href={`${userInfo.id}/edit`} />
        </div>
      )}
    </div>
  );
};

export default ProfileCard;
