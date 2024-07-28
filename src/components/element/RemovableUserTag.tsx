import React from "react";

import { X } from "lucide-react";

type Props = {
  tagName: string;
};

const RemovableUserTag: React.FC<Props> = ({ tagName }) => {
  return (
    <div>
      <span className="mb-2 mr-2 inline-flex items-center rounded-full bg-blue-100 px-2 py-1 text-sm text-blue-800 hover:bg-blue-300">
        <span className="mr-1">{tagName}</span>
        <button className=" rounded-full p-1 hover:bg-blue-200 focus:outline-none ">
          <X size={15} />
        </button>
      </span>
    </div>
  );
};

export default RemovableUserTag;
