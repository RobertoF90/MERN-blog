import Layout from '../../components/layout';
import { API_URL } from '@/config';

import Link from 'next/link';

export default function Post({ post }) {
  return (
    <Layout>
      {post.attributes.title}

      <br />
      {post.attributes.text}
      <br />

      <Link href="/">Back to home</Link>
    </Layout>
  );
}

export async function getStaticPaths() {
  const res = await fetch(`${API_URL}/api/posts`);
  const posts = await res.json();

  const paths = posts.data.map((post) => ({
    params: { slug: post.attributes.slug },
  }));
  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps({ params: { slug } }) {
  const res = await fetch(`${API_URL}/api/posts?filters\[Slug\][$eq]=${slug}`);

  const posts = await res.json();

  return {
    props: { post: posts.data[0] },
    revalidate: 1,
  };
}
