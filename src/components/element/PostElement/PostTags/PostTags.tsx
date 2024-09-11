import { Tag } from '@/lib/types';
import Link from 'next/link';
import UserTag from '../../UserTag';

const PostTags = ({ tags }: { tags: Tag[] }) => {
  return (
    <div className='mt-4 flex flex-wrap gap-2'>
      {tags &&
        tags.map((tag) => (
          <Link key={tag.id} href={`/timeline/${tag.id}`} onClick={(e) => e.stopPropagation()}>
            <UserTag tagName={tag.name} />
          </Link>
        ))}
    </div>
  );
};

export default PostTags;
