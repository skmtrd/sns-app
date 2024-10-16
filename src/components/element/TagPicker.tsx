'use client';

import { ProfileSchema, tagSchema } from '@/lib/schemas';
import { Tag } from '@/lib/types';
import { ChevronDown, ChevronUp, Plus } from 'lucide-react';
import { useState } from 'react';
import { z } from 'zod';
import RemovableUserTag from './RemovableUserTag';
import UserTag from './UserTag';

type userInfo = z.infer<typeof ProfileSchema>;
type tag = z.infer<typeof tagSchema>;

type TagPickerProps = {
  userInfo: userInfo;
  allTags: tag[];
  updateTags: (newTags: Tag[]) => void;
  updatedTags: Tag[];
};

export const TagPicker: React.FC<TagPickerProps> = ({
  userInfo,
  allTags,
  updateTags,
  updatedTags,
}) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const availableTags = allTags.filter((tag) => updatedTags.every((t: Tag) => t.name !== tag.name));

  const handleAddTag = (tagName: string) => {
    const newSelectedTags = [...updatedTags, { id: '', name: tagName }];
    updateTags(newSelectedTags);
  };

  const handleRemoveTag = (tagName: string) => {
    const newSelectedTags = updatedTags.filter((tag: Tag) => tag.name !== tagName);
    updateTags(newSelectedTags);
  };

  console.log(availableTags);

  return (
    <div>
      <label className='block text-sm font-medium text-gray-700'>タグ</label>
      <div className='mt-2 flex flex-wrap'>
        {updatedTags.map((tag: Tag) => (
          <RemovableUserTag key={tag.name} tagName={tag.name} handleRemoveTag={handleRemoveTag} />
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
            {availableTags.map((tag) => (
              <div
                key={tag.name}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleAddTag(tag.name);
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
