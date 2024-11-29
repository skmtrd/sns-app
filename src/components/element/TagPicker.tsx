'use client';

import { ProfileSchema, tagSchema } from '@/lib/schemas';
import { Tag } from '@/lib/types';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';
import { z } from 'zod';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import RemovableUserTag from './RemovableUserTag';
import UserTag from './UserTag';

type userInfo = z.infer<typeof ProfileSchema>;
type tag = z.infer<typeof tagSchema>;

type TagPickerProps = {
  allTags: tag[];
  updateTags: (newTags: Tag[]) => void;
  updatedTags: Tag[];
};

export const TagPicker: React.FC<TagPickerProps> = ({ allTags, updateTags, updatedTags }) => {
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
      <div className='flex flex-wrap'>
        {updatedTags.length >= 1 ? (
          updatedTags.map((tag: Tag) => (
            <RemovableUserTag key={tag.name} tagName={tag.name} handleRemoveTag={handleRemoveTag} />
          ))
        ) : (
          <p className='text-base text-black/80'>タグなし</p>
        )}
      </div>
      <Button
        type='button'
        variant={'secondary'}
        className='mt-2 w-full'
        onClick={() => setIsDrawerOpen(!isDrawerOpen)}
      >
        追加
        {} {isDrawerOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </Button>
      <div
        className={`mt-2 w-full overflow-x-hidden overflow-y-scroll rounded-md border border-gray-200 bg-white transition-all duration-300 ease-in-out ${
          isDrawerOpen ? 'max-h-64' : 'max-h-0'
        }`}
      >
        <div className='w-full p-4'>
          <Input className='mb-4' id='word' placeholder='タグを検索'></Input>
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
