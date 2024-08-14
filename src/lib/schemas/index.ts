import { z } from 'zod';

export const postSchema = z
  .object({
    id: z.string(),
    content: z.string(),
    avatar: z.string(),
    authorId: z.string(),
    createdAt: z.string(),
    author: z.object({
      id: z.string(),
      name: z.string(),
      clerkId: z.string(),
      introduction: z.string(),
      tags: z.array(z.object({ id: z.string(), name: z.string() })).optional(),
    }),
    likes: z.array(
      z.object({
        user: z.object({ id: z.string(), name: z.string(), clerkId: z.string() }),
      }),
    ),
    replies: z.array(
      z.object({
        id: z.string(),
        content: z.string(),
        createdAt: z.string(),
        parentReplyId: z.string().nullable(),
        author: z.object({
          id: z.string(),
          name: z.string(),
          clerkId: z.string(),
          tags: z.array(z.object({ id: z.string(), name: z.string() })).optional(),
        }),
      }),
    ),
  })
  .array();

export const questionSchema = z
  .object({
    author: z.object({
      name: z.string(),
      id: z.string(),
      clerkId: z.string(),
      tags: z.array(z.object({ name: z.string(), id: z.string() })),
    }),
    createdAt: z.string(),
    id: z.string(),
    title: z.string(),
    description: z.string(),
    replies: z.array(
      z.object({
        id: z.string(),
        content: z.string(),
        parentReplyId: z.string().nullable(),
        createdAt: z.string(),
        author: z.object({
          id: z.string(),
          name: z.string(),
          clerkId: z.string(),
        }),
      }),
    ),
  })
  .array();

export const profileSchema = z.object({
  name: z.string(),
  id: z.string(),
  clerkId: z.string(),
  email: z.string(),
  introduction: z.string().nullable(),
  avatar: z.string().nullable(),
  tags: z.array(z.object({ name: z.string(), id: z.string() })),
  posts: z.array(
    z.object({
      content: z.string(),
      id: z.string(),
      authorId: z.string(),
      createdAt: z.string(),
      likes: z.array(
        z.object({
          user: z.object({ id: z.string(), name: z.string(), clerkId: z.string() }),
        }),
      ),
      replies: z.array(
        z.object({
          id: z.string(),
          content: z.string(),
          createdAt: z.string(),
          parentReplyId: z.string().nullable(),
          author: z.object({
            id: z.string(),
            name: z.string(),
            clerkId: z.string(),
            tags: z.array(z.object({ id: z.string(), name: z.string() })).optional(),
          }),
        }),
      ),
    }),
  ),
});

export const oneOfPostSchema = z.object({
  id: z.string(),
  content: z.string(),
  avatar: z.string(),
  authorId: z.string(),
  createdAt: z.string(),
  author: z.object({
    id: z.string(),
    name: z.string(),
    clerkId: z.string(),
    introduction: z.string().optional(),
    tags: z.array(z.object({ id: z.string(), name: z.string() })).optional(), // tagsをオプションにする
  }),
  likes: z.array(
    z.object({
      user: z.object({ id: z.string(), name: z.string(), clerkId: z.string() }),
    }),
  ),
  replies: z.array(
    z.object({
      id: z.string(),
      content: z.string(),
      createdAt: z.string(),
      avatar: z.string(),
      // likes: z
      //   .array(
      //     z.object({
      //       author: z.object({ id: z.string(), name: z.string(), clerkId: z.string() }),
      //     }),
      //   )
      //   .optional(),
      parentReplyId: z.string().nullable(),
      author: z.object({
        id: z.string(),
        name: z.string(),
        introduction: z.string().optional(),
        clerkId: z.string(),
        tags: z.array(z.object({ id: z.string(), name: z.string() })).optional(), // tagsをオプションにする
      }),
    }),
  ),
});

export const assignmentshareSchema = z
  .object({
    id: z.string(),
    title: z.string(),
    description: z.string(),
    deadLine: z.string(),
    authorId: z.string(),
    createdAt: z.string(),
    author: z.object({
      id: z.string(),
      name: z.string(),
      clerkId: z.string(),
      introduction: z.string(),
      tags: z.array(z.object({ id: z.string(), name: z.string() })).optional(),
    }),
    // likes: z.array(
    //   z.object({
    //     author: z.object({ id: z.string(), name: z.string(), clerkId: z.string() }),
    //   }),
    // ),
    // replies: z.array(
    //   z.object({
    //     id: z.string(),
    //     content: z.string(),
    //     createdAt: z.string(),
    //     parentReplyId: z.string().nullable(),
    //     author: z.object({
    //       id: z.string(),
    //       name: z.string(),
    //       clerkId: z.string(),
    //       tags: z.array(z.object({ id: z.string(), name: z.string() })).optional(),
    //     }),
    //   }),
    // ),
  })
  .array();
