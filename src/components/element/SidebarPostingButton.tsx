'use client';

import { useState } from 'react';
import { AddAssignment } from '../assignmentshare/AddAssignmentModal';
import { AddQuestion } from '../question/AddQuestionModal';
import { AddPost } from '../timeline/AddPostModal';

const SidebarPostingButton = ({
  icon,
  label,
}: {
  icon: React.ReactNode;
  label: 'ポスト' | '質問' | '課題';
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const closeModal = () => {
    setIsOpen(false);
  };

  const modals = {
    ポスト: <AddPost closeModal={closeModal} />,
    質問: <AddQuestion closeModal={closeModal} />,
    課題: <AddAssignment closeModal={closeModal} />,
  };

  return (
    <div
      onClick={() => setIsOpen(true)}
      className='mt-4 flex w-full items-center justify-center rounded bg-blue-600 px-6 py-3 font-bold text-white transition-colors duration-200 hover:bg-blue-800 xl:w-2/4'
    >
      {isOpen && modals[label]}
      <div className='flex w-full items-center justify-center'>
        <div className='flex items-center xl:mr-2'>{icon}</div>
        <span className='hidden xl:inline'>{label}</span>
      </div>
    </div>
  );
};

export default SidebarPostingButton;
