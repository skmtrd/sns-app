'use client';
import { Tag } from '@/lib/types';
import { Search } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Button } from '../ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { ToggleGroup, ToggleGroupItem } from '../ui/toggle-group';
import { TagPicker } from './TagPicker';

type Props = {
  allTags: Tag[];
};

const SearchingDialog: React.FC<Props> = ({ allTags }) => {
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const [selectedType, setSelectedType] = useState<string>('ポスト');
  const [searchWord, setSearchWord] = useState<string>('');
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const updateTags = (newTags: Tag[]) => {
    setSelectedTags(newTags);
  };

  const handleSearch = () => {
    const tagParams = selectedTags.map((tag) => tag.id).join('-');
    console.log(tagParams);
    router.push(`/search?word=${searchWord}&type=${selectedType}&tags=${tagParams}`);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className='w-9/12 rounded-full'>検索</Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>検索</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div className='flex flex-col gap-y-6'>
          <div className='flex flex-col gap-y-3'>
            <Label className='text-muted-foreground' htmlFor='word'>
              検索ワードを入力
            </Label>
            <Input
              className='rounded-full'
              id='word'
              value={searchWord}
              onChange={(e) => setSearchWord(e.target.value)}
            />
          </div>
          <div className='flex flex-col gap-y-3'>
            <Label className='text-muted-foreground'>投稿タイプを選択</Label>
            <ToggleGroup
              value={selectedType}
              onValueChange={(value) => value && setSelectedType(value)}
              variant='outline2'
              type='single'
              className='gap-8'
            >
              {['ポスト', '質問', '課題'].map((item) => (
                <ToggleGroupItem
                  key={item}
                  value={item}
                  aria-label='Toggle bold'
                  className='border-transparent ring-1 ring-secondary transition-all duration-200 data-[state=on]:bg-white data-[state=on]:ring-black data-[state=on]:ease-in-out'
                >
                  <p className=''>{item}</p>
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
          </div>
          <div className='flex flex-col gap-y-3'>
            <Label className='text-muted-foreground' htmlFor='tagPicker'>
              絞り込むタグを選択
            </Label>
            <div id='tagPicker'>
              <TagPicker allTags={allTags} updatedTags={selectedTags} updateTags={updateTags} />
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleSearch} className='w-full'>
            <Search className='size-4' />
            検索
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SearchingDialog;
