import sharp from 'sharp';
import { v4 as uuidv4 } from 'uuid';

export const convertToWebp = async (image: File) => {
  const buffer = await image.arrayBuffer();
  let webpBuffer;
  let fileName;

  if (image.type === 'image/gif') {
    webpBuffer = await sharp(buffer, { animated: true }).webp().toBuffer();
    fileName = `${uuidv4()}.webp`;
  } else {
    webpBuffer = await sharp(buffer).webp({ quality: 80 }).toBuffer();
    fileName = `${uuidv4()}.webp`;
  }

  return { webpBuffer, fileName };
};
