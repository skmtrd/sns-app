'use client';
import { useRelativeTime } from '@/hooks/useRelativeTime';
import { ICON_IMAGE_BASE_URL } from '@/lib/constants/baseUrl';
import { Reply as ReplyType } from '@/lib/types';
import PostTags from './PostElement/PostTags/PostTags';
import ReplyBottomItems from './ReplyElement/ReplyBottomItems';
import ReplyHeader from './ReplyElement/ReplyHeader';
import ReplyMain from './ReplyElement/ReplyMain';

type ReplyProps = {
  reply: ReplyType;
  currentUserId: string;
};

export const Reply: React.FC<ReplyProps> = ({ reply, currentUserId }) => {
  const timeAgo = useRelativeTime(reply.createdAt);
  console.log(reply.author);

  return (
    <div className='w-11/12 rounded-lg bg-white p-4 shadow hover:bg-slate-50'>
      <ReplyHeader
        src={
          reply.author.iconUrl
            ? `${ICON_IMAGE_BASE_URL}${reply.author.iconUrl}`
            : reply.author.image
              ? reply.author.image
              : ''
        }
        timeAgo={timeAgo}
        name={reply.author.name}
        id={reply.author.id}
      />
      <div className='h-5' />
      <ReplyMain textContent={reply.content} />
      <div className='h-5' />
      <div className='flex w-full items-center justify-between'>
        <PostTags tags={reply.author.tags || []} />
        <ReplyBottomItems
          postReplyId={reply.id}
          currentUserId={currentUserId}
          postAuthorId={reply.author.id}
          // likes={reply.likes}
        />
      </div>
    </div>
  );
};
