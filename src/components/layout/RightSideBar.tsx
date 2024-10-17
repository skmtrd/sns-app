'use client';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { ToggleGroup, ToggleGroupItem } from '../ui/toggle-group';
const PAGE_TYPE = ['timeline', 'question', 'assignmentshare'];

const RightSideBar = () => {
  return (
    <div className='z-10 ml-auto hidden w-80 border-l border-gray-200 bg-white p-4 font-bold xl:flex xl:justify-center'>
      <Dialog>
        <DialogTrigger asChild>
          <Button className='w-9/12 rounded-full'>検索</Button>
        </DialogTrigger>
        <DialogContent className='sm:max-w-[425px]'>
          <DialogHeader>
            <DialogTitle>検索</DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <Label className='text-muted-foreground' htmlFor='word'>
            検索ワードを入力
          </Label>
          <Input className='rounded-full' id='word'></Input>
          <Label className='text-muted-foreground'>投稿タイプを選択</Label>
          <ToggleGroup variant='outline' type='multiple' className='gap-8'>
            <ToggleGroupItem value='post' aria-label='Toggle bold'>
              <p className='font-bold'>ポスト</p>
            </ToggleGroupItem>
            <ToggleGroupItem value='assignment' aria-label='Toggle italic'>
              <p className='font-bold'>課題</p>
            </ToggleGroupItem>
            <ToggleGroupItem value='question' aria-label='Toggle underline'>
              <p className='font-bold'>質問</p>
            </ToggleGroupItem>
          </ToggleGroup>
          <DialogFooter>
            <Button type='submit'>Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default RightSideBar;
