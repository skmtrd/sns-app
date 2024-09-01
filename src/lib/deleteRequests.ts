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

export const deleteQuestion = async (questionId: string) => {
  try {
    const res = await fetch(`/api/question/${questionId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error(error);
  }
};

export const deleteAssignment = async (assignmentId: string) => {
  try {
    const res = await fetch(`/api/assignment/${assignmentId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error(error);
  }
};
