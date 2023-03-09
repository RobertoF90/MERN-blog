export async function getAllPostIds() {
  try {
    console.log('hello');
    const res = await fetch('/api/v1/posts');

    if (!res.ok) {
      throw new Error('Failed to fetch data');
    }

    const posts = await res.json();
    return posts.map((post) => {
      console.log(post);
      return {
        params: {
          id: post._id,
        },
      };
    });
  } catch (err) {
    console.log(err);
  }
}

export async function getPostData(id) {
  const res = await fetch(`/api/v1/posts/${id}`);
  const post = await res.json();
  return {
    id,
    post,
  };
}
