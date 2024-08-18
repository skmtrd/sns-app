export const addPostLike = async (postId: string) => {
  const response = await fetch('/api/like/post', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ postId }),
  });

  if (!response.ok) {
    throw new Error('いいねに失敗しました');
  }
};

export const deletePostLike = async (postId: string) => {
  const response = await fetch('/api/like/post', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ postId }),
  });

  if (!response.ok) {
    throw new Error('いいね解除に失敗しました');
  }
};

export const addQuestionLike = async (questionId: string) => {
  const response = await fetch('/api/like/question', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ questionId }),
  });

  if (!response.ok) {
    throw new Error('いいねに失敗しました');
  }
};

export const deleteQuestionLike = async (questionId: string) => {
  const response = await fetch('/api/like/question', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ questionId }),
  });

  if (!response.ok) {
    throw new Error('いいね解除に失敗しました');
  }
};
