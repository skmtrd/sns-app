import { convertToWebp } from './convertToWebp';
import { supabase } from './supabase/supabase';

export const uploadPostImage = async (image: File | null) => {
  if (!image) return { fileName: null };
  const { webpBuffer, fileName } = await convertToWebp(image);
  const { data, error: uploadError } = await supabase.storage
    .from('post-images')
    .upload(fileName, webpBuffer, {
      contentType: 'image/webp',
    });
  //   const { data, error: uploadError } = await supabase.storage
  //     .from('post-images')
  //     .upload(image.name, image);

  //   const fileName = image.name;

  return { fileName };
};
