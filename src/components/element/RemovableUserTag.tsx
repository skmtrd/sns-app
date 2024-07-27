import React from "react";

import { X } from "lucide-react";

type Props = {
  tagName: string;
};

const RemovableUserTag: React.FC<Props> = ({ tagName }) => {
  return (
    <div>
      <span className="bg-blue-100 text-blue-800 text-sm px-2 py-1 rounded-full mr-2 mb-2 hover:bg-blue-300 inline-flex items-center">
        <span className="mr-1">{tagName}</span>
        <button className=" focus:outline-none hover:bg-blue-200 rounded-full p-1 ">
          <X size={15} />
        </button>
      </span>
    </div>
  );
};

export default RemovableUserTag;
