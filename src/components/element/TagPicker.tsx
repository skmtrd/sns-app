'use client';

import { Tag } from '@/lib/types';
import { ChevronDown, ChevronUp, Plus } from 'lucide-react';
import { useState } from 'react';
import RemovableUserTag from './RemovableUserTag';
import UserTag from './UserTag';

type TagPickerProps = {
  tags: Tag[];
  onChange: (tags: Tag[]) => void;
  defaultTags?: Tag[];
};

export const TagPicker: React.FC<TagPickerProps> = ({ tags, defaultTags, onChange }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedTags, setSelectedTags] = useState<Tag[]>(defaultTags ?? []);

  const selectableTags = tags.filter((tag) => !selectedTags.includes(tag));

  const handleAddTag = (tag: Tag) => {
    if (selectedTags.includes(tag)) return;
    setSelectedTags([...selectedTags, tag]);
    onChange([...selectedTags, tag]);
  };

  const handleRemoveTag = (tag: Tag) => {
    setSelectedTags(selectedTags.filter((t) => t !== tag));
    onChange(selectedTags.filter((t) => t !== tag));
  };

  return (
    <div>
      <label className='block text-sm font-medium text-gray-700'>タグ</label>
      <div className='mt-2 flex flex-wrap'>
        {selectedTags.map((tag) => (
          <RemovableUserTag
            key={tag.id}
            tagName={tag.name}
            handleRemoveTag={() => handleRemoveTag(tag)}
          />
        ))}
      </div>
      <button
        type='button'
        onClick={() => setIsDrawerOpen(!isDrawerOpen)}
        className='flex w-full items-center justify-between rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50'
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
            {selectableTags.map((tag) => (
              <div key={tag.id} onClick={() => handleAddTag(tag)}>
                <UserTag tagName={tag.name}></UserTag>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
