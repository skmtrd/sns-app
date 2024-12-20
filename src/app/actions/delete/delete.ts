'use server';
import { revalidatePath } from 'next/cache';
import prisma from '../../api/lib/prisma';

export const deletePost = async (postId: string) => {
  const deletedPost = await prisma.$transaction(async (tx) => {
    await tx.postReply.deleteMany({ where: { postId } });
    await tx.like.deleteMany({ where: { postId } });
    return await tx.post.delete({ where: { id: postId } });
  });

  revalidatePath('/timeline');
  revalidatePath('/likes');
  revalidatePath(`/profile/${deletedPost.authorId}`);
  return deletedPost;
};

export const deleteQuestion = async (questionId: string) => {
  const deletedQuestion = await prisma.$transaction(async (tx) => {
    await tx.questionReply.deleteMany({ where: { questionId } });
    await tx.like.deleteMany({ where: { questionId } });
    return await tx.question.delete({ where: { id: questionId } });
  });

  revalidatePath('/questions');
  revalidatePath('/bookmarks');
  return deletedQuestion;
};

export const deleteAssignment = async (assignmentId: string) => {
  const deletedAssignment = await prisma.$transaction(async (tx) => {
    await tx.assignmentReply.deleteMany({ where: { assignmentId } });
    await tx.like.deleteMany({ where: { assignmentId } });
    return await tx.assignment.delete({ where: { id: assignmentId } });
  });

  revalidatePath('/assignments');
  revalidatePath('/my-assignments');
  return deletedAssignment;
};

export const deletePostReply = async (postReplyId: string) => {
  const deletedPostReply = await prisma.$transaction(async (tx) => {
    return await tx.postReply.delete({
      where: { id: postReplyId },
      include: { post: true },
    });
  });

  revalidatePath(`/post/${deletedPostReply.post.id}`);
  return deletedPostReply;
};
