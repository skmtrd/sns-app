import { PrismaClient } from "@prisma/client";

//postgrelに接続する
export const dbConnect = async () => {
  try {
    const prisma = new PrismaClient();
    await prisma.$connect();
    console.log("connect success");
  } catch (error) {
    throw error;
  }
};
