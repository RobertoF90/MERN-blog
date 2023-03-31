import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Layout from '../../components/layout';
import { API_URL } from '@/config';
import { useRouter } from 'next/router';

import Link from 'next/link';

export default function Post({ post }) {
  const router = useRouter();

  return (
    <Layout>
      <div>
        <button>
          <Link href={`/posts/edit/${post.attributes.slug}`}>Edit</Link>
        </button>
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
  const res = await fetch(`${API_URL}/api/posts/${slug}`);
  const posts = await res.json();
  console.log(posts);
  return {
    props: {
      post: posts.data,
    },
  };
}
