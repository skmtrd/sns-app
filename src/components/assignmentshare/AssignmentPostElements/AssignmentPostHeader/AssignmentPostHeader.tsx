type Props = {
  title: string;
  name: string;
  timeAgo: string;
};

const AssignmentPostHeader = ({ title, name, timeAgo }: Props) => {
  return (
    <div className='flex justify-between'>
      <div>
        <h2 className='mb-1 pr-20 text-xl font-bold text-gray-800'>{title}</h2>
        <p className='text-sm text-gray-500'>{name}さん</p>
      </div>
      <p className='mr-1 whitespace-nowrap text-sm text-gray-500'>{timeAgo}</p>
    </div>
  );
};

export default AssignmentPostHeader;
