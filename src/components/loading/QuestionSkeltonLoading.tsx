import { Profile } from '@/lib/types';
import { ChevronDown, Heart, MessageCircleReply, MoreVertical } from 'lucide-react';
import Header from '../element/Header';
import FixedHeader from '../layout/FixedHeader';
const SkeltonPost = () => {
  return (
    <div className='relative w-11/12 rounded-lg bg-white p-6 shadow'>
      <div className='flex items-start justify-between'>
        <div className='w-3/4'>
          <div className='h-7 w-full animate-pulse rounded bg-gray-200'></div>
          <div className='mt-2 h-4 w-1/3 animate-pulse rounded bg-gray-200'></div>
          <div className='mt-4 h-4 w-full animate-pulse rounded bg-gray-200'></div>
          <div className='mt-2 h-4 w-5/6 animate-pulse rounded bg-gray-200'></div>
        </div>
        <div className='h-4 w-20 animate-pulse rounded bg-gray-200'></div>
      </div>

      <div className='mt-6'>
        <div className='h-5 w-1/4 animate-pulse rounded bg-gray-200'></div>

        <div className='mt-4 space-y-4'>
          <div className='h-20 w-full animate-pulse rounded bg-gray-200'></div>
        </div>
      </div>

      <div className='mt-6 flex w-full items-center justify-between'>
        <div className='flex items-center justify-center gap-2'>
          <div className='flex size-10 animate-pulse items-center justify-center rounded-full bg-gray-200'>
            <MessageCircleReply size={20} className='text-gray-300' />
          </div>
          <div className='flex size-10 animate-pulse items-center justify-center rounded-full bg-gray-200'>
            <Heart size={20} className='text-gray-300' />
          </div>
        </div>
        <div className='flex gap-2'>
          <div className='flex size-10 animate-pulse items-center justify-center rounded-full bg-gray-200'>
            <ChevronDown size={20} className='text-gray-300' />
          </div>
          <div className='flex size-10 animate-pulse items-center justify-center rounded-full bg-gray-200'>
            <MoreVertical size={20} className='text-gray-300' />
          </div>
        </div>
      </div>
    </div>
  );
};

const QuestionSkeltonLoading = ({ title, subtitle }: { title: string; subtitle: string }) => {
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

export default QuestionSkeltonLoading;
