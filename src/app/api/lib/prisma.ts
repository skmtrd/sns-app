import { PrismaClient } from '@prisma/client';

declare global {
  var prisma: PrismaClient | undefined;
}

const prisma = global.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') global.prisma = prisma;
// import { PrismaClient } from '@prisma/client';
// import { withAccelerate } from '@prisma/extension-accelerate';

// const prisma = new PrismaClient().$extends(withAccelerate());

export default prisma;
