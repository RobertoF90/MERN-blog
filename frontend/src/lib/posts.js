export async function getAllPostIds() {
  console.log('hello');
  const res = await fetch('http://localhost:5000/api/v1/posts');
  const posts = await res.json();
  console.log(posts);

  return posts.map((post) => {
    console.log(post);
    return {
      params: {
        id: post._id,
      },
    };
  });
}

export async function getPostData(id) {
  const res = await fetch(`http://localhost:5000/api/v1/posts/${id}`);
  const post = await res.json();
  return {
    id,
    post,
  };
}
