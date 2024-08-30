import { toHiragana } from 'wanakana';

export const containsAllWords = (content: string, searchTerms: string[]): boolean => {
  const hiraganaContent = toHiragana(content);
  return searchTerms.every(
    (term) => hiraganaContent.includes(toHiragana(term)) || content.includes(term),
  );
};
