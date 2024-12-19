import Header from '@/components/element/Header';
import { PATCHNOTE_LIST } from '@/lib/constants/patchnote';

const page = ({ params }: { params: { id: string } }) => {
  const patchnote = PATCHNOTE_LIST.find((patchnote) => patchnote.id === params.id);
  return (
    <div className='flex h-screen flex-1 flex-col overflow-hidden bg-gray-100'>
      <Header title={patchnote?.title ?? ''} />
      <main className='mx-auto w-full max-w-5xl overflow-y-auto py-8 sm:px-6 lg:px-8'>
        <div className='flex flex-col rounded-lg bg-white p-4'>
          <p className='text-xl font-bold'>{patchnote?.title}</p>
          <p className='mt-2 text-sm text-gray-500'>{patchnote?.date}</p>
          <p className='mt-8 text-xl font-bold text-black'>変更点 :</p>
          <ul className='list-disc pl-5'>
            {patchnote?.changes.map((change, index) => (
              <li className='mt-2' key={index}>
                <p className='font-bold text-black'>{change.title}</p>
                <p className='text-black'>{change.description}</p>
              </li>
            ))}
          </ul>
          <p className='mt-8 text-xl font-bold text-black'>技術的な変更点 :</p>
          <ul className='list-disc pl-5'>
            {patchnote?.minorChanges.map((change, index) => (
              <li className='mt-2' key={index}>
                <p className='font-bold text-black'>{change.title}</p>
                <p className='text-black'>{change.description}</p>
              </li>
            ))}
          </ul>
          <p className='mt-8 text-xl font-bold text-black'>
            現在の発見されているバグ　修正予定のバグ :
          </p>
          <ul className='list-disc pl-5'>
            {patchnote?.currentIssues.map((issue, index) => (
              <li className='mt-2' key={index}>
                <p className='font-bold text-black'>{issue.title}</p>
                <p className='text-black'>{issue.description}</p>
              </li>
            ))}
          </ul>
        </div>
      </main>
    </div>
  );
};

export default page;
