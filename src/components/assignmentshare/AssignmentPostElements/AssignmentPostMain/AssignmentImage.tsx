import { ImageDisplayModal } from '@/components/element/ImageDisplayModal';
import { useImageModal } from '@/hooks/useImageModal';
import Image from 'next/image';
const AssignmentImage = ({ src }: { src: string }) => {
  const { isImageModalOpen, modalSrc, openImageModal, closeImageModal } = useImageModal();
  return (
    <div className='flex w-full items-center justify-center object-contain'>
      {isImageModalOpen && <ImageDisplayModal src={modalSrc} closeModal={closeImageModal} />}
      <div className='flex w-full items-center justify-center md:w-9/12'>
        <button
          onClick={(e) => {
            e.stopPropagation();
            openImageModal(src);
          }}
        >
          <Image
            style={{ width: '100%', borderRadius: 10 }}
            src={src}
            alt='ポストの画像'
            width={1000}
            height={1000}
            quality={100}
            className='cursor-pointer'
          />
        </button>
      </div>
    </div>
  );
};

export default AssignmentImage;
