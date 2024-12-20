import TextContent from '@/components/element/TextContent';

type Props = {
  textContent: string;
};

const ReplyMain: React.FC<Props> = ({ textContent }) => {
  return (
    <div className='flex w-full flex-col items-center justify-center'>
      <div
        onClick={(e) => e.stopPropagation()}
        className='flex w-full items-center justify-center md:w-5/6'
      >
        <TextContent textContent={textContent} />
      </div>
      <div className='h-6' />
    </div>
  );
};

export default ReplyMain;
