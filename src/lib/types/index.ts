import { z } from 'zod';
import { AssignmentSchema, LikeSchema, PostSchema, QuestionSchema, ReplySchema } from '../schemas';

export type Post = z.infer<typeof PostSchema>;
export type Question = z.infer<typeof QuestionSchema>;
export type Assignment = z.infer<typeof AssignmentSchema>;
export type Like = z.infer<typeof LikeSchema>;
export type Reply = z.infer<typeof ReplySchema>;

export type UserInfo = {
  id: string;
  name: string;
  email: string;
  introduction: string;
  createdAt: string;
  updatedAt: string;
  tags: Tag[];
};

export type Tag = {
  id: string;
  name: string;
};

// export type Reply = {
//   id: string;
//   createdAt: string;
//   author: {
//     id: string;
//     clerkId: string;
//     name: string;
//     introduction?: string | undefined;
//     tags?: { id: string; name: string }[] | undefined;
//   };
//   avatar: string | null;
//   content: string;
//   parentReplyId: string | null;
// };

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
