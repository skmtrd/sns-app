import { ImageDisplayModal } from '@/components/element/ImageDisplayModal';
import { useImageModal } from '@/hooks/useImageModal';
import Image from 'next/image';
const PostIcon = ({ src }: { src: string }) => {
  const { isImageModalOpen, modalSrc, openImageModal, closeImageModal } = useImageModal();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    openImageModal(src);
  };

  return (
    <div onClick={handleClick} role='button' tabIndex={0}>
      {isImageModalOpen && <ImageDisplayModal src={modalSrc} closeModal={closeImageModal} />}
      <Image
        src={src}
        alt={'postImage'}
        width={50}
        height={50}
        className='size-12 rounded-full object-cover hover:opacity-80'
      />
    </div>
  );
};

export default PostIcon;
