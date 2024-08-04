import sharp from 'sharp';

export const converToJpeg = async (file: File, quality = 80) => {
  const buffer = await file.arrayBuffer();
  const image = sharp(Buffer.from(buffer));
  const jpegBuffer = await image.jpeg({ quality }).toBuffer();
  return new File([jpegBuffer], file.name, { type: 'image/jpeg' });
};
