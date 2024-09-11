import TextContent from '../../TextContent';
import PostImage from './PostImage';

type Props = {
  textContent: string;
  imageUrl: string | null;
};

const PostMain: React.FC<Props> = ({ textContent, imageUrl }) => {
  return (
    <div className='flex w-full flex-col items-center'>
      <div className='flex w-full md:w-5/6'>
        <TextContent textContent={textContent} />
      </div>
      {imageUrl && <PostImage src={imageUrl} />}
    </div>
  );
};

export default PostMain;
