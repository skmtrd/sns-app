import React from 'react';

type Props = {
  tagName: string;
};

const UserTag: React.FC<Props> = ({ tagName }) => {
  return (
    <div>
      <span className='inline-flex items-center rounded-full bg-blue-100 px-2 py-1 text-sm text-blue-800 shadow hover:bg-blue-300'>
        <span className='mr-1'>{tagName}</span>
      </span>
    </div>
  );
};

export default UserTag;
