import React from "react";

type Props = {
  tagName: string;
};

const UserTag: React.FC<Props> = ({ tagName }) => {
  return (
    <div>
      <span className="bg-blue-100 text-blue-800 text-sm px-2 py-1 rounded-full hover:bg-blue-300 inline-flex items-center ">
        <span className="mr-1">{tagName}</span>
      </span>
    </div>
  );
};

export default UserTag;
