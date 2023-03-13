import styles from '@/styles/Home.module.css';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Layout from '@/components/layout';
import PostItem from '@/components/PostItem';
import { API_URL } from '@/config/index';
import qs from 'qs';

export default function Home({ posts }) {
  const router = useRouter();
  return (
    <Layout title="Search Results">
      <Link href="/">Go back</Link>
      <h1>Search Results for {router.query.term}</h1>
      <main className={styles.main}>
        {posts.data.map((post) => (
          <PostItem key={post.id} post={post} />
        ))}
      </main>
    </Layout>
  );
}

export async function getServerSideProps({ query: { term } }) {
  const query = qs.stringify(
    {
      filters: {
        $or: [
          {
            title: {
              $contains: term,
            },
          },
          {
            text: {
              $contains: term,
            },
          },
        ],
      },
    },
    {
      encodeValuesOnly: true,
    }
  );
  console.log(query);
  const res = await fetch(`${API_URL}/api/posts?${query}&populate=*`);
  const posts = await res.json();

  return {
    props: { posts },
  };
}
