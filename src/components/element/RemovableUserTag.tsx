import React from 'react';

import { X } from 'lucide-react';

type Props = {
  tagName: string;
  handleRemoveTag: (tagName: string) => void;
};

const RemovableUserTag: React.FC<Props> = ({ tagName, handleRemoveTag }) => {
  return (
    <div>
      <span className='mb-2 mr-2 inline-flex items-center rounded-full bg-blue-100 px-2 py-1 text-sm text-blue-800 shadow hover:bg-blue-300'>
        <span className='mr-1'>{tagName}</span>
        <div
          className='rounded-full p-1 hover:bg-blue-200 focus:outline-none'
          onClick={() => handleRemoveTag(tagName)}
        >
          <X size={15} />
        </div>
      </span>
    </div>
  );
};

export default RemovableUserTag;
