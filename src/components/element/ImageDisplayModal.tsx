'use client';
import Image from 'next/image';
type ImageDisplayModalProps = {
  closeModal: () => void;
  src: string | null;
};

export const ImageDisplayModal: React.FC<ImageDisplayModalProps> = ({ closeModal, src }) => {
  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        closeModal();
      }}
      className='animate-fadeIn fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-md'
    >
      {src && <Image src={src} alt={'画像'} width={500} height={500} />}
    </div>
  );
};
