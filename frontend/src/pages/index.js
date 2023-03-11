import Image from 'next/image';
import styles from '@/styles/Home.module.css';
import Link from 'next/link';
import Layout from '@/components/layout';
import PostItem from '@/components/PostItem';
import { API_URL } from '@/config/index';

export default function Home({ posts }) {
  return (
    <Layout>
      <main className={styles.main}>
        {posts.data.map((post) => (
          <PostItem key={post.id} post={post} />
        ))}
      </main>
    </Layout>
  );
}

export async function getStaticProps() {
  const res = await fetch(`${API_URL}/api/posts?populate=*`);
  const posts = await res.json();

  return {
    props: { posts },
    revalidate: 1,
  };
}
