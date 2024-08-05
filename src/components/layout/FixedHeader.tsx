type TimeLineHeaderProps = {
  target: string | undefined;
  title: string;
};

const FixedHeader: React.FC<TimeLineHeaderProps> = ({ title, target }) => {
  return (
    <div className='relative z-10 w-full'>
      <header className='fixed flex w-full items-center justify-between border-b border-gray-200 bg-white p-4'>
        <h2 className='text-xl font-bold'>
          {title}-{target}
        </h2>
        <div className='flex items-center'>
          <div className='relative mr-4'></div>
        </div>
      </header>
    </div>
  );
};

export default FixedHeader;
