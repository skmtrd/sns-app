import { useState } from 'react';

export const useTagTab = () => {
  const [currentTagId, setCurrentTagId] = useState<string | null>('all');
  const handleTagClick = (tagId: string) => {
    setCurrentTagId(tagId);
  };
  return { currentTagId, handleTagClick };
};
