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
  author: { name: string, id: string, clerkId: string };
};
