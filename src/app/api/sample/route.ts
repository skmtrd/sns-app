import { NextResponse } from 'next/server';
import { supabase } from '../lib/supabase/supabase';

// ... existing code ...

export const POST = async (req: Request, res: NextResponse) => {
  const formData = await req.formData();
  const file = formData.get('file') as File;
  console.log('file:', file);
  const { data, error } = await supabase.storage.from('icon-images').upload(`file.size1`, file, {
    contentType: 'image/svg',
  });

  if (error) {
    console.error('Upload error:', error);
  } else {
    console.log('File uploaded successfully:', data);
  }
};
