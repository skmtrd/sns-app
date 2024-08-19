'use client';

import { Tag } from '@/lib/types';
import { ChevronDown, ChevronUp, Plus } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import { useSWRConfig } from 'swr';
import RemovableUserTag from './RemovableUserTag';
import UserTag from './UserTag';

type TagPickerProps = {
  tags: Tag[];
  selectedTags: Tag[];
  clerkId: string;
  userInfo: any;
};

export const TagPicker: React.FC<TagPickerProps> = ({ tags, selectedTags, clerkId, userInfo }) => {
  useEffect(() => {
    console.log(tags);
  }, []);

  const { mutate } = useSWRConfig();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleAddTag = useCallback(
    (tag: Tag) => {
      const newSelectedTags = [...selectedTags, tag];
      mutate(`/api/profile/${clerkId}`, { ...userInfo, tags: newSelectedTags }, false);
    },
    [selectedTags, clerkId, userInfo, mutate],
  );

  const handleRemoveTag = useCallback(
    (tagName: string) => {
      const newSelectedTags = selectedTags.filter((tag) => tag.name !== tagName);
      mutate(`/api/profile/${clerkId}`, { ...userInfo, tags: newSelectedTags }, false);
    },
    [selectedTags, clerkId, userInfo, mutate],
  );

  if (!selectedTags) {
    mutate(`/api/profile/${clerkId}`);
    return <div>Loading...</div>;
  }

  return (
    <div>
      <label className='block text-sm font-medium text-gray-700'>タグ</label>
      <div className='mt-2 flex flex-wrap'>
        {selectedTags.map((tag) => (
          <RemovableUserTag key={tag.id} tagName={tag.name} handleRemoveTag={handleRemoveTag} />
        ))}
      </div>
      <button
        type='button'
        onClick={() => setIsDrawerOpen(!isDrawerOpen)}
        className='mt-4 flex w-full items-center justify-between rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50'
      >
        <span className='flex items-center'>
          <Plus size={20} className='mr-2' />
          タグを追加
        </span>
        {isDrawerOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </button>
      <div
        className={`mt-2 w-full overflow-x-hidden overflow-y-scroll rounded-md border border-gray-200 bg-white transition-all duration-300 ease-in-out ${
          isDrawerOpen ? 'max-h-64' : 'max-h-0'
        }`}
      >
        <div className='w-full p-4'>
          <input
            type='text'
            placeholder='タグを検索'
            id='tag-search'
            className='mb-4 w-full rounded-md border px-3 py-2'
          />
          <div className='flex flex-wrap gap-2'>
            {tags
              .filter((tag) => !selectedTags.some((t) => t.id === tag.id))
              .map((tag) => (
                <div
                  key={tag.id}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleAddTag(tag);
                  }}
                >
                  <UserTag tagName={tag.name}></UserTag>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};
