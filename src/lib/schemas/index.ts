import { z } from 'zod';

// export const postSchema = z
//   .object({
//     id: z.string(),
//     content: z.string(),
//     avatar: z.string(),
//     authorId: z.string(),
//     createdAt: z.string(),
//     author: z.object({
//       id: z.string(),
//       name: z.string(),
//       clerkId: z.string(),
//       introduction: z.string(),
//       tags: z.array(z.object({ id: z.string(), name: z.string() })).optional(),
//     }),
//     likes: z.array(
//       z.object({
//         user: z.object({ id: z.string(), name: z.string(), clerkId: z.string() }),
//       }),
//     ),
//     replies: z.array(
//       z.object({
//         id: z.string(),
//         content: z.string(),
//         createdAt: z.string(),
//         parentReplyId: z.string().nullable(),
//         author: z.object({
//           id: z.string(),
//           name: z.string(),
//           clerkId: z.string(),
//           tags: z.array(z.object({ id: z.string(), name: z.string() })).optional(),
//         }),
//       }),
//     ),
//   })
//   .array();

// export const oneOfPostSchema = z.object({
//   id: z.string(),
//   content: z.string(),
//   avatar: z.string(),
//   authorId: z.string(),
//   createdAt: z.string(),
//   author: z.object({
//     id: z.string(),
//     name: z.string(),
//     clerkId: z.string(),
//     introduction: z.string().optional(),
//     tags: z.array(z.object({ id: z.string(), name: z.string() })).optional(), // tagsをオプションにする
//   }),
//   likes: z.array(
//     z.object({
//       user: z.object({ id: z.string(), name: z.string(), clerkId: z.string() }),
//     }),
//   ),
//   replies: z.array(
//     z.object({
//       id: z.string(),
//       content: z.string(),
//       createdAt: z.string(),
//       avatar: z.string().nullable(),
//       // likes: z
//       //   .array(
//       //     z.object({
//       //       author: z.object({ id: z.string(), name: z.string(), clerkId: z.string() }),
//       //     }),
//       //   )
//       //   .optional(),
//       parentReplyId: z.string().nullable(),
//       author: z.object({
//         id: z.string(),
//         name: z.string(),
//         introduction: z.string().optional(),
//         clerkId: z.string(),
//         tags: z.array(z.object({ id: z.string(), name: z.string() })).optional(), // tagsをオプションにする
//       }),
//     }),
//   ),
// });

const tagSchema = z.object({
  id: z.string(),
  name: z.string(),
});

const userSchema = z.object({
  id: z.string(),
  name: z.string(),
  clerkId: z.string(),
});

const authorSchema = userSchema.extend({
  introduction: z.string().optional(),
  tags: z.array(tagSchema).optional(),
});

const replySchema = z.object({
  id: z.string(),
  content: z.string(),
  createdAt: z.string(),
  parentReplyId: z.string().nullable(),
  author: authorSchema,
  avatar: z.string().nullable(),
});

export const PostSchema = z.object({
  id: z.string(),
  content: z.string(),
  avatar: z.string(),
  authorId: z.string(),
  createdAt: z.string(),
  author: authorSchema,
  likes: z.array(z.object({ user: userSchema })),
  replies: z.array(replySchema),
});

export const QuestionSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  authorId: z.string(),
  author: authorSchema,
  createdAt: z.string(),
  avatar: z.string().nullable(),
  likes: z.array(z.object({ user: userSchema })),
  replies: z.array(replySchema),
});

export const AssignmentSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  deadLine: z.string(),
  author: authorSchema,
  authorId: z.string(),
  createdAt: z.string(),
  avatar: z.string().nullable(),
  likes: z.array(z.object({ user: userSchema })),
  replies: z.array(replySchema),
});

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

// export const assignmentshareSchema = z
//   .object({
//     id: z.string(),
//     title: z.string(),
//     description: z.string(),
//     deadLine: z.string(),
//     authorId: z.string(),
//     createdAt: z.string(),
//     likes: z.array(
//       z.object({
//         user: z.object({ id: z.string(), name: z.string(), clerkId: z.string() }),
//       }),
//     ),
//     author: z.object({
//       id: z.string(),
//       name: z.string(),
//       clerkId: z.string(),
//       introduction: z.string(),
//       tags: z.array(z.object({ id: z.string(), name: z.string() })).optional(),
//     }),
//     // likes: z.array(
//     //   z.object({
//     //     author: z.object({ id: z.string(), name: z.string(), clerkId: z.string() }),
//     //   }),
//     // ),
//     // replies: z.array(
//     //   z.object({
//     //     id: z.string(),
//     //     content: z.string(),
//     //     createdAt: z.string(),
//     //     parentReplyId: z.string().nullable(),
//     //     author: z.object({
//     //       id: z.string(),
//     //       name: z.string(),
//     //       clerkId: z.string(),
//     //       tags: z.array(z.object({ id: z.string(), name: z.string() })).optional(),
//     //     }),
//     //   }),
//     // ),
//   })
//   .array();
