import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { getOrCreateTagIds } from "../../../utils/getOrCreateTagIds";
import { dbConnect } from "@/utils/dbConnect";

export const GET = async (req: Request, res: NextResponse) => {
  try {
    dbConnect();
    const posts = await prisma.post.findMany();
    return NextResponse.json({ message: "success", posts }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "failed" });
  }
};

export const POST = async (req: Request, res: NextResponse) => {
  try {
    dbConnect();

    const { content, tags } = await req.json();
    //Tagテーブルのtagのidを返す
    const tagIds = await getOrCreateTagIds(tags);

    //clerkのuserIdからUserテーブルのuserIdを取得
    // const { userId } = auth();
    const userId = "user_2jjlMJSYQcpj3t8c7MMuH99j8T4";
    const user = await prisma.user.findUnique({
      where: { clerkId: userId ?? undefined },
    });

    //postgresqlに投稿
    const newPost = await prisma.post.create({
      data: {
        content,
        author: {
          connect: { id: user.id },
        },
        tags: {
          connect: tagIds,
        },
      },
      include: {
        author: true,
        tags: true,
      },
    });

    await prisma.$disconnect();
    return NextResponse.json({ message: "success", newPost }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "failed" });
  }
};



// import { NextResponse } from "next/server";
// import prisma from "../../../../lib/prisma";
// import { auth } from "@clerk/nextjs/server";
// import { getOrCreateTagIds } from "@/utils/getOrCreateTagIds";
// import { dbConnect } from "@/utils/dbConnect";

// export const GET = async (req: Request, res: NextResponse) => {
//   try {
//     await dbConnect();
//     const posts = await prisma.post.findMany({
//       include: {
//         author: true,
//         tags: true,
//       },
//       orderBy: {
//         createdAt: "desc",
//       },
//     });
//     return NextResponse.json({ message: "success", posts }, { status: 200 });
//   } catch (error) {
//     console.error("Error fetching posts:", error);
//     return NextResponse.json(
//       { message: "failed", error: error.message },
//       { status: 500 }
//     );
//   } finally {
//     await prisma.$disconnect();
//   }
// };

// export const POST = async (req: Request, res: NextResponse) => {
//   try {
//     await dbConnect();
//     const { content, tags } = await req.json();
//     const tagIds = await getOrCreateTagIds(tags);

//     // const { userId } = auth();
//     const userId = "user_2jhauyplkyOridmV0VAgac9cNbe";
//     if (!userId) {
//       return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
//     }

//     const user = await prisma.user.findUnique({
//       where: { clerkId: userId },
//     });

//     if (!user) {
//       return NextResponse.json({ message: "User not found" }, { status: 404 });
//     }

//     const newPost = await prisma.post.create({
//       data: {
//         content,
//         author: {
//           connect: { id: user.id },
//         },
//         tags: {
//           connect: tagIds.map((id) => ({ id })),
//         },
//       },
//       include: {
//         author: true,
//         tags: true,
//       },
//     });

//     return NextResponse.json({ message: "success", newPost }, { status: 201 });
//   } catch (error) {
//     console.error("Error creating post:", error);
//     return NextResponse.json(
//       { message: "failed", error: error.message },
//       { status: 500 }
//     );
//   } finally {
//     await prisma.$disconnect();
//   }
// };
