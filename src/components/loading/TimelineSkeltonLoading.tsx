import { Profile } from '@/lib/types';
import { Heart, MessageCircleReply, MoreVertical } from 'lucide-react';
import Header from '../element/Header';
import FixedHeader from '../layout/FixedHeader';

const SkeltonPost = () => {
  return (
    <div className='w-11/12 rounded-lg bg-white p-4 shadow'>
      <div className='mb-2 flex items-center justify-start'>
        <div className='relative'>
          <div className='size-10 animate-pulse rounded-full bg-gray-200'></div>
        </div>
        <div className='ml-2 w-full'>
          <div className='flex w-full items-center justify-between'>
            <div className='h-4 w-1/4 animate-pulse rounded bg-gray-200'></div>
            <div className='h-4 w-16 animate-pulse rounded bg-gray-200'></div>
          </div>
          <div className='mt-1 h-3 w-1/5 animate-pulse rounded bg-gray-200'></div>
        </div>
      </div>
      <div className='mb-4'>
        <div className='mb-2 ml-1 w-full'>
          <div className='h-4 w-full animate-pulse rounded bg-gray-200'></div>
          <div className='mt-2 h-4 w-3/4 animate-pulse rounded bg-gray-200'></div>
          <div className='mt-2 h-4 w-1/2 animate-pulse rounded bg-gray-200'></div>
        </div>
      </div>
      <div className='flex flex-wrap gap-2'>
        <div className='h-6 w-16 animate-pulse rounded-full bg-gray-200'></div>
        <div className='h-6 w-20 animate-pulse rounded-full bg-gray-200'></div>
        <div className='h-6 w-24 animate-pulse rounded-full bg-gray-200'></div>
      </div>
      <div className='relative mt-6 flex w-full items-center justify-between'>
        <div className='flex items-center justify-center gap-2'>
          <div className='flex h-9 w-20 animate-pulse items-center justify-center rounded-full bg-gray-200'>
            <MessageCircleReply size={20} className='text-gray-300' />
          </div>
          <div className='flex h-9 w-16 animate-pulse items-center justify-center rounded-full bg-gray-200'>
            <Heart size={20} className='text-gray-300' />
          </div>
        </div>
        <div className='flex size-9 animate-pulse items-center justify-center rounded-full bg-gray-200'>
          <MoreVertical size={20} className='text-gray-300' />
        </div>
      </div>
    </div>
  );
};

const TimelineSkeltonLoading = ({ title, subtitle }: { title: string; subtitle: string }) => {
  const duummy = () => {
    return;
  };
  const userInfo: Profile = {
    id: '',
    name: '',
    introduction: '',
    iconUrl: '',
    image: '',
    tags: [],
    posts: [],
  };
  return (
    <div className='flex w-full flex-1 grow flex-col items-center gap-4 overflow-y-auto bg-gray-100'>
      <FixedHeader userInfo={userInfo} handleTagClick={duummy} currentTagId={null} />
      <Header title={''} />
      <div className='h-1 w-full'></div>
      <div className='flex w-full flex-col items-center gap-y-4'>
        <SkeltonPost />
        <SkeltonPost />
        <SkeltonPost />
        <SkeltonPost />
        <SkeltonPost />
        <SkeltonPost />
      </div>
    </div>
  );
};

export default TimelineSkeltonLoading;
