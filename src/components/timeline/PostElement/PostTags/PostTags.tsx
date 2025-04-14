import UserTag from '@/components/element/UserTag';
import { Tag } from '@/lib/types';

const PostTags = ({ tags }: { tags: Tag[] }) => {
  return (
    <div className='flex w-full flex-col items-center justify-center'>
      <div className='flex w-full flex-wrap gap-2 md:w-5/6'>
        {tags &&
          tags.map((tag) => (
            <div key={tag.id} onClick={(e) => e.stopPropagation()}>
              <UserTag tagName={tag.name} />
            </div>
          ))}
      </div>
    </div>
  );
};

export default PostTags;
