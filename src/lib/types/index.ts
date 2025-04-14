import { z } from 'zod';
import {
  AssignmentSchema,
  LikeSchema,
  PostSchema,
  ProfileSchema,
  QuestionSchema,
  ReplySchema,
  tagSchema,
} from '../schemas';

export type Post = z.infer<typeof PostSchema>;
export type Question = z.infer<typeof QuestionSchema>;
export type Assignment = z.infer<typeof AssignmentSchema>;
export type Like = z.infer<typeof LikeSchema>;
export type Reply = z.infer<typeof ReplySchema>;
export type Profile = z.infer<typeof ProfileSchema>;
export type Tag = z.infer<typeof tagSchema>;
