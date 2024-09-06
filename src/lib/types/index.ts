import { z } from 'zod';
import { AssignmentSchema, LikeSchema, PostSchema, QuestionSchema } from '../schemas';

export type Post = z.infer<typeof PostSchema>;
export type Question = z.infer<typeof QuestionSchema>;
export type Assignment = z.infer<typeof AssignmentSchema>;
export type Like = z.infer<typeof LikeSchema>;

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
  createdAt: string;
  author: {
    id: string;
    clerkId: string;
    name: string;
    introduction?: string | undefined;
    tags?: { id: string; name: string }[] | undefined;
  };
  avatar: string | null;
  content: string;
  parentReplyId: string | null;
};

export type QuestionReply = {
  id: string;
  createdAt: string;
  author: {
    id: string;
    clerkId: string;
    name: string;
    introduction?: string | undefined;
    tags?: { id: string; name: string }[] | undefined;
  };
  content: string;
  parentReplyId: string | null;
};
