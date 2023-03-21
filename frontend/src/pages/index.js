import styles from '@/styles/Home.module.css';
import Layout from '@/components/layout';
import Header from '@/components/Header';
import PostItem from '@/components/PostItem';
import { API_URL } from '@/config/index';

export default function Home({ posts }) {
  return (
    <Layout>
      <Header></Header>
      <main className={styles.main}>
        {posts.data.map((post) => (
          <PostItem key={post.id} post={post} />
        ))}
      </main>
    </Layout>
  );
}

export async function getServerSideProps() {
  const res = await fetch(`${API_URL}/api/posts?populate=*`);
  const posts = await res.json();

  return {
    props: { posts },
  };
}
