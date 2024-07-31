import Link from 'next/link';

type ButtonProps = {
  title: string;
  href: string;
};

const Button: React.FC<ButtonProps> = ({ title, href }) => {
  return (
    <Link href={href}>
      <button className='mt-2 rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50'>
        {title}
      </button>
    </Link>
  );
};

export default Button;
