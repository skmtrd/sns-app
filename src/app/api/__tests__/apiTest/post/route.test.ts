import { dbConnect } from "../../../../../app/api/lib/dbConnect";
import { expect, test, describe, jest } from "@jest/globals";
import "@testing-library/jest-dom";
import { NextApiRequest, NextApiResponse } from "next";
import { createMocks } from "node-mocks-http";
import { PrismaClient } from '@prisma/client'


describe("/api/post", () => {
  test("GET /api/post", async () => {
    const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
      method: "GET",
    });


    jest.mock('@prisma/client', () => {
      return {
        PrismaClient: jest.fn().mockImplementation(() => ({
          post: {
            findMany: jest.fn(),
          },
          $connect: jest.fn(),
          $disconnect: jest.fn(),
        })),
      }
    })

    // dbConnect();
    const prisma = new PrismaClient() as jest.Mocked<PrismaClient>
    const posts = prisma.post.findMany()

    expect(res._getStatusCode()).toBe(200);
    expect(res._getData()).toEqual(
      expect.objectContaining({
        message: "success",
        data: posts,
      })
    );
  });
});
