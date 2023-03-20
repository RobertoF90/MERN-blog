import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Layout from '../../components/layout';
import { API_URL } from '@/config';
import { useRouter } from 'next/router';

import Link from 'next/link';

export default function Post({ post }) {
  const router = useRouter();
  const deleteEvent = async (e) => {
    if (confirm('Are you sure?')) {
      const res = await fetch(`${API_URL}/api/posts/${post.id}`, {
        method: 'DELETE',
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message);
      } else {
        router.push('/');
      }
    }
  };

  return (
    <Layout>
      <div>
        <button>
          <Link href={`/posts/edit/${post.id}`}>Edit</Link>
        </button>
        <button onClick={deleteEvent}>Delete</button>
      </div>
      <h1>{post.attributes.title}</h1>

      <br />
      {post.attributes.text}
      <br />

      <Link href="/">Back to home</Link>
    </Layout>
  );
}

// export async function getStaticPaths() {
//   const res = await fetch(`${API_URL}/api/posts`);
//   const posts = await res.json();

//   const paths = posts.data.map((post) => ({
//     params: { slug: post.attributes.slug },
//   }));
//   return {
//     paths,
//     fallback: true,
//   };
// }

// export async function getStaticProps({ params: { slug } }) {
//   const res = await fetch(`${API_URL}/api/posts?filters\[Slug\][$eq]=${slug}`);

//   const posts = await res.json();

//   return {
//     props: { post: posts.data[0] },
//     revalidate: 1,
//   };
// }
export async function getServerSideProps({ query: { slug } }) {
  const res = await fetch(`${API_URL}/api/${slug}`);
  const posts = await res.json();
  console.log(posts);
  return {
    props: {
      post: posts.data[0],
    },
  };
}
