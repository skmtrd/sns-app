type TimeLineHeaderProps = {
  target: string | undefined;
  title: string;
  scrollToTop: () => void;
};

const FixedHeader: React.FC<TimeLineHeaderProps> = ({ title, target, scrollToTop }) => {
  return (
    <div className='relative z-10 w-full'>
      <header className='fixed flex w-full items-center justify-between border-b border-gray-200 bg-white p-4'>
        <button onClick={scrollToTop}>
          <h2 className='text-xl font-bold'>
            {title}-{target}
          </h2>
        </button>
        <div className='flex items-center'>
          <div className='relative mr-4'></div>
        </div>
      </header>
    </div>
  );
};

export default FixedHeader;
