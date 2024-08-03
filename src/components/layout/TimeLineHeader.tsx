type TimeLineHeaderProps = {
  target: string | undefined;
};

const TimeLineHeader: React.FC<TimeLineHeaderProps> = ({ target }) => {
  return (
    <div className='relative w-full'>
      <header className='fixed flex w-full items-center justify-between border-b border-gray-200 bg-white p-4'>
        <h2 className='text-xl font-bold'>タイムライン-{target}</h2>
        <div className='flex items-center'>
          <div className='relative mr-4'></div>
        </div>
      </header>
    </div>
  );
};

export default TimeLineHeader;
