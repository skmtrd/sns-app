import { Trash } from 'lucide-react';
import { SharePost } from '../timeline/SharePost';

type KebabMenuProps = {
  currentClerkId: string | null | undefined;
  authorClerkId: string;
  contentId: string;
  handleDelete: (e: React.MouseEvent<HTMLButtonElement>, contentId: string) => void;
};

const KebabMenu: React.FC<KebabMenuProps> = ({
  currentClerkId,
  authorClerkId,
  handleDelete,
  contentId,
}) => {
  return (
    <div className='absolute bottom-full right-0 mb-2 w-32 rounded-md bg-white shadow-lg ring-1 ring-black/20'>
      <div className='py-1'>
        {currentClerkId === authorClerkId && (
          <button
            onClick={(e: React.MouseEvent<HTMLButtonElement>) => handleDelete(e, contentId)}
            className='flex w-full items-center justify-start px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100'
          >
            <Trash size={16} className='mr-2 inline-block' />
            削除
          </button>
        )}
        <SharePost postId={contentId} />
      </div>
    </div>
  );
};

export default KebabMenu;
