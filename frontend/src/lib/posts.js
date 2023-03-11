// import axios from 'axios';

// export async function getAllPostIds() {
//   try {
//     console.log('hello');
//     const res = await fetch('http://127.0.0.1:1337/api/posts');

//     if (!res.ok) {
//       throw new Error('Failed to fetch data');
//     }

//     const posts = await res.json();
//     return posts.data.map((post) => {
//       console.log(post.id);
//       return {
//         params: {
//           slug: post.id.toString(),
//         },
//       };
//     });
//   } catch (err) {
//     console.log(err);
//   }
// }

// export async function getPostData(id) {
//   const res = await fetch(`http://localhost:1337/api/posts/post-${id}`);
//   const post = await res.json();
//   return {
//     id,
//     post,
//   };
// }
