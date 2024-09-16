import { Tag } from '@/lib/types';
import Link from 'next/link';
import UserTag from '../../UserTag';

const PostTags = ({ tags }: { tags: Tag[] }) => {
  return (
    <div className='flex w-full flex-col items-center justify-center'>
      <div className='flex w-full flex-wrap gap-2 md:w-5/6'>
        {tags &&
          tags.map((tag) => (
            <Link key={tag.id} href={`/timeline/${tag.id}`} onClick={(e) => e.stopPropagation()}>
              <UserTag tagName={tag.name} />
            </Link>
          ))}
      </div>
    </div>
  );
};

export default PostTags;
