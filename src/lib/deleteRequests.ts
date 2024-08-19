export const deletePost = async (postId: string) => {
  try {
    const res = await fetch(`/api/post/${postId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error(error);
  }
};
