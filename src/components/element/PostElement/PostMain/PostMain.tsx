import TextContent from '../../TextContent';
import PostImage from './PostImage';

type Props = {
  textContent: string;
  imageUrl: string | null;
};

const PostMain: React.FC<Props> = ({ textContent, imageUrl }) => {
  return (
    <div className='flex w-full flex-col items-center justify-center'>
      <div
        onClick={(e) => e.stopPropagation()}
        className='flex w-full items-center justify-center md:w-5/6'
      >
        <TextContent textContent={textContent} />
      </div>
      <div className='h-6' />
      {imageUrl && <PostImage src={imageUrl} />}
    </div>
  );
};

export default PostMain;
