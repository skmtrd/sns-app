export type UserInfo = {
  id: string;
  clerkId: string;
  name: string;
  email: string;
  introduction: string;
  avatar?: string;
  createdAt: string;
  updatedAt: string;
  tags: Tag[];
};

export type Tag = {
  id: string;
  name: string;
};

export type Reply = {
  id: string;
  content: string;
  // avatar: string;
  createdAt: string;
  author: {
    id: string;
    name: string;
    clerkId: string;
    introduction?: string;
    tags?: Tag[] | undefined;
  };
  // likes?: {
  //   // likes をオプショナルに変更
  //   author: {
  //     id: string;
  //     name: string;
  //     clerkId: string;
  //   };
  // }[];
  parentReplyId: string | null;
};
