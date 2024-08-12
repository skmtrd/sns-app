import { Check, Copy, MoreHorizontal, Share, X } from 'lucide-react';
import React, { useState } from 'react';
import { SiLine, SiX } from 'react-icons/si';

type SharePostProps = {
  postId: string;
};

export const SharePost: React.FC<SharePostProps> = ({ postId }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const targetUrl = `http://localhost:3000/posts/${postId}`;

  const canShare = Boolean(navigator.share) ? true : false;

  const handleShareClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsModalOpen(true);
  };

  const handleCloseModal = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsModalOpen(false);
  };

  const handleSystemShare = () => {
    navigator.share({
      title: '投稿をシェア',
      url: targetUrl,
    });
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(targetUrl);
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };

  const links = [
    {
      name: 'X',
      icon: <SiX size={20} />,
      href: `https://x.com/intent/tweet?text=${targetUrl}`,
    },
    {
      name: 'LINE',
      icon: <SiLine size={20} color='06c755' />,
      href: `https://line.me/R/share?text=${targetUrl}`,
    },
  ];

  return (
    <>
      <button
        className='flex w-full items-center justify-start px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100'
        onClick={(e) => handleShareClick(e)}
      >
        <Share size={16} className='mr-2 inline-block' />
        共有
      </button>

      {isModalOpen && (
        <div
          onClick={(e) => handleCloseModal(e)}
          className='fixed inset-0 z-10 flex items-center justify-center bg-black/40'
        >
          <div
            className='flex w-80 flex-col rounded-lg bg-white p-4 shadow-lg'
            onClick={(e) => e.stopPropagation()}
          >
            <div className='relative flex select-none items-center justify-center'>
              <button className='absolute left-0' onClick={handleCloseModal}>
                <X size={24} />
              </button>
              <h2 className='text-lg font-bold'>投稿をシェア</h2>
            </div>
            <div className='mt-5 flex select-none justify-evenly gap-2'>
              {links.map((link) => (
                <div key={link.name} className='flex flex-col items-center'>
                  <a
                    className='rounded-full border border-slate-200 p-4'
                    href={link.href}
                    target='_blank'
                  >
                    {link.icon}
                  </a>
                  <p className='text-center'>{link.name}</p>
                </div>
              ))}
              {canShare && (
                <div key='system' className='flex flex-col items-center'>
                  <button
                    className='rounded-full border border-slate-200 p-4'
                    onClick={handleSystemShare}
                  >
                    <MoreHorizontal size={20} />
                  </button>
                  <p className='text-center'>その他</p>
                </div>
              )}
            </div>
            <div className='relative mt-5 items-center'>
              <input
                type='text'
                className='w-full rounded-md border border-gray-200 bg-blue-50 p-2 outline-none focus:ring-1 focus:ring-blue-300'
                value={targetUrl}
                onClick={(e) => e.currentTarget.select()}
                readOnly
              />
              <button
                onClick={handleCopy}
                className='absolute right-1 top-1/2 -translate-y-1/2 rounded-md bg-blue-600 px-1.5 py-2 text-white'
              >
                {isCopied ? <Check size={20} /> : <Copy size={20} />}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
