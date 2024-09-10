import { useState } from 'react';

export const useImageModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [src, setSrc] = useState('');

  const openModal = (src: string) => {
    setSrc(src);
    setIsOpen(!isOpen);
  };
  const closeModal = () => {
    setIsOpen(false);
  };
  return {
    isImageModalOpen: isOpen,
    modalSrc: src,
    openImageModal: openModal,
    closeImageModal: closeModal,
  };
};
