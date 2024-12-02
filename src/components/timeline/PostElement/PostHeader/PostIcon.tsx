import { ImageDisplayModal } from '@/components/element/ImageDisplayModal';
import { useImageModal } from '@/hooks/useImageModal';
import Image from 'next/image';
const PostIcon = ({ src }: { src: string }) => {
  const { isImageModalOpen, modalSrc, openImageModal, closeImageModal } = useImageModal();
  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        openImageModal(src);
      }}
    >
      {isImageModalOpen && <ImageDisplayModal src={modalSrc} closeModal={closeImageModal} />}
      <Image
        src={src}
        alt={'postImage'}
        width={50}
        height={50}
        className='size-12 rounded-full object-cover hover:opacity-80'
      />
    </button>
  );
};

export default PostIcon;
