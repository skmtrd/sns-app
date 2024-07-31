type HeaderProps = {
  title: string;
};

const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    <header className='flex items-center justify-between border-b border-gray-200 bg-white p-4'>
      <h2 className='text-xl font-bold'>{title}</h2>
      <div className='flex items-center'>
        <div className='relative mr-4'></div>
      </div>
    </header>
  );
};

export default Header;
