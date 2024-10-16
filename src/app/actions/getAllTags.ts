'use server';
import prisma from '../api/lib/prisma';

export const getAllTags = async () => {
  const tags = await prisma.tag.findMany({
    select: {
      id: true,
      name: true,
    },
  });
  return tags;
};
