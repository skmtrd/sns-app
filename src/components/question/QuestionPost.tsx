const QuestionPost = ({ post }) => {
  return (
    <div key={post.id} className='w-11/12 rounded-lg bg-white p-4 shadow'>
      <div className='flex items-start justify-between'>
        <div>
          <h3 className='text-lg font-bold'>{post.title}</h3>
          <p className='text-sm text-gray-600'>{post.author.name}さん</p>
          <p className='mt-2'>{post.description}</p>
        </div>
        <p className='mr-1 text-sm text-gray-500'>{post.createdAt}</p>
      </div>
      <div className='mt-4'>
        <h4 className='font-semibold'>回答</h4>
        <div className='mt-2 border-l-2 border-blue-300 pl-4'>
          <p className='text-sm text-gray-600'>{post.answers[0].name}さんの回答:</p>
          <p>{post.answers[0].content}</p>
        </div>
      </div>
    </div>
  );
};

export default QuestionPost;
