import {
  DeleteObjectCommand,
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import z from 'zod';

const credentials = z
  .object({
    accessKeyId: z.string({ required_error: 'S3_ACCESS_KEY_ID is required' }).min(1),
    secretAccessKey: z.string({ required_error: 'S3 SECRET_ACCESS_KEY is required' }).min(1),
  })
  .parse({
    accessKeyId: process.env.S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
  });

const regex = RegExp(/(https:\/\/[a-zA-Z0-9.-]+)\/([a-zA-Z0-9-]+)/);
const S3URL = z.string().regex(regex).parse(process.env.S3_URL);
const endpoint = z.string().min(1).parse(S3URL.match(regex)?.[1]);
const bucketName = z.string().min(1).parse(S3URL.match(regex)?.[2]);

export const client = new S3Client({
  region: 'APAC',
  endpoint,
  credentials,
});

export const putObject = async (key: string, body: Buffer, contentType?: string) => {
  await client.send(
    new PutObjectCommand({
      Bucket: bucketName,
      Key: key,
      Body: body,
      ContentType: contentType,
      Expires: new Date(),
    }),
  );
};

export const getObjectURL = async (key: string) => {
  const command = new GetObjectCommand({
    Bucket: bucketName,
    Key: key,
  });
  return await getSignedUrl(client, command);
};

export const deleteObject = async (key: string) => {
  await client.send(
    new DeleteObjectCommand({
      Bucket: bucketName,
      Key: key,
    }),
  );
};
