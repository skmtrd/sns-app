import { getAllTags } from '@/app/actions/getAllTags';
import SearchingDialog from '../element/SearchingDialog';
const PAGE_TYPE = ['timeline', 'question', 'assignmentshare'];

const RightSideBar = async () => {
  const allTags = await getAllTags();
  return (
    <div className='z-10 ml-auto hidden w-80 border-l border-gray-200 bg-white p-4 font-bold xl:flex xl:justify-center'>
      <SearchingDialog allTags={allTags} />
    </div>
  );
};

export default RightSideBar;
