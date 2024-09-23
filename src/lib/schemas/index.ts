import { z } from 'zod';

const tagSchema = z.object({
  id: z.string(),
  name: z.string(),
});

export const userSchema = z.object({
  id: z.string(),
  name: z.string(),
});

const authorSchema = userSchema.extend({
  introduction: z.string().nullable(),
  tags: z.array(tagSchema).optional(),
  iconUrl: z.string().nullable(),
});

export const ReplySchema = z.object({
  id: z.string(),
  content: z.string(),
  createdAt: z.string(),
  parentReplyId: z.string().nullable(),
  author: authorSchema,
});

export const LikeSchema = z.object({
  user: userSchema,
});

export const PostSchema = z.object({
  id: z.string(),
  content: z.string(),
  imageUrl: z.string().nullable(),
  authorId: z.string(),
  createdAt: z.string(),
  author: authorSchema,
  likes: z.array(z.object({ user: userSchema })),
  replies: z.array(ReplySchema),
});

export const QuestionSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  authorId: z.string(),
  author: authorSchema,
  createdAt: z.string(),
  // avatar: z.string().nullable(),
  likes: z.array(z.object({ user: userSchema })),
  replies: z.array(ReplySchema),
});

export const AssignmentSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  deadLine: z.string(),
  author: authorSchema,
  authorId: z.string(),
  createdAt: z.string(),
  imageUrl: z.string().nullable(),
  likes: z.array(z.object({ user: userSchema })),
  replies: z.array(ReplySchema),
});

export const ProfileSchema = z.object({
  name: z.string(),
  id: z.string(),
  email: z.string(),
  introduction: z.string().nullable(),
  iconUrl: z.string().nullable(),
  tags: z.array(z.object({ name: z.string(), id: z.string() })),
  posts: z.array(PostSchema),
});
