import TextContent from '@/components/element/TextContent';

const AssignmentPostMain = ({
  deadlineContent,
  limited,
  description,
}: {
  deadlineContent: string;
  limited: string;
  description: string;
}) => {
  return (
    <div className='items-center text-sm'>
      <TextContent textContent={description} />
      <div className='h-5' />
      <p className='text-base text-red-500'>{deadlineContent}まで</p>
      <div className='flex items-center'>
        {limited === 'over' ? (
          <p className='text-base font-bold text-red-500'>締め切りを過ぎています！！！</p>
        ) : (
          <p className='text-base font-bold text-red-500'>あと{limited}</p>
        )}
      </div>
    </div>
  );
};

export default AssignmentPostMain;
