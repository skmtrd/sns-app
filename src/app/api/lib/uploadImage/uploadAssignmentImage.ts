import { convertToWebp } from '../convertToWebp';
import { supabase } from '../supabase/supabase';

export const uploadAssignmentImage = async (image: File | null) => {
  if (!image) return { fileName: null };
  const { webpBuffer, fileName } = await convertToWebp(image);
  const { data, error: uploadError } = await supabase.storage
    .from('assignment-images')
    .upload(fileName, webpBuffer, {
      contentType: 'image/webp',
    });

  return { fileName };
};
