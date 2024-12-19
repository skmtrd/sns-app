import Header from '@/components/element/Header';
import { PATCHNOTE_LIST } from '@/lib/constants/patchnote';
import Link from 'next/link';

const PatchnoteBox = ({ title, date, id }: { title: string; date: string; id: string }) => {
  return (
    <div className='flex w-full flex-col rounded-lg bg-white p-4 shadow-md'>
      <div className='flex flex-col gap-2'>
        <Link href={`/patchnotes/${id}`} className='text-xl font-bold'>
          {title}
        </Link>
        <p className='text-sm text-gray-500'>{date}</p>
      </div>
    </div>
  );
};

const page = () => {
  return (
    <div className='flex h-screen flex-1 flex-col overflow-hidden bg-gray-100'>
      <Header title={'パッチノート'} />
      <main className='mx-auto w-full max-w-5xl py-8 sm:px-6 lg:px-8'>
        <div className='flex flex-col items-center space-y-6'>
          {PATCHNOTE_LIST.map((patchnote) => (
            <PatchnoteBox
              title={patchnote.title}
              date={patchnote.date}
              key={patchnote.title}
              id={patchnote.id}
            />
          ))}
        </div>
      </main>
    </div>
  );
};

export default page;
