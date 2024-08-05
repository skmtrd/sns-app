import { Calendar } from 'lucide-react';

const AssignmentPost = () => {
  return (
    <div className='relative mb-4 w-11/12 rounded-lg bg-white p-6 shadow-md'>
      <h2 className='mb-1 pr-20 text-xl font-semibold text-gray-800'>CS概論1 Python</h2>
      <p className='mb-3 text-sm text-gray-500'>坂本蒼哉</p>
      <p className='mb-3 break-words text-black'>
        Pysdniubwasdna hbydbiuahshdiugisabdhjabdhbsaiucgiusauigbdiuasbshjdbakjhbdi Pysdniubwasdna
        hbydbiuahshdiugisabdhjabdhbsaiucgiusauigbdiuasbshjdbakjhbdi Pysdniubwasdna
        hbydbiuahshdiugisabdhjabdhbsaiucgiusauigbdiuasbshjdbakjhbdi
      </p>
      <div className='items-center text-sm text-red-500'>
        <div className='flex items-center'>
          <Calendar size={14} className='mr-1' />
          <p>2024-11-9</p>
        </div>
        <p>あと３日</p>
      </div>
    </div>
  );
};

export default AssignmentPost;
