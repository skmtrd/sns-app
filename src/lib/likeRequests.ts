export const postLike = async (postId: string) => {
  const response = await fetch('/api/like', {
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

export const deleteLike = async (postId: string) => {
  const response = await fetch('/api/like', {
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
