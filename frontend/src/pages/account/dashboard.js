import { parseCookies } from '@/helpers/index';
import Layout from '@/components/layout';
import DashboardPost from '@/components/DashboardPost';
import { API_URL } from '@/config';
import styles from '@/styles/Dashboard.module.css';

export default function DashboardPage({ posts }) {
  const deletePost = (id) => {
    console.log(id);
  };

  return (
    <Layout title="User Dashboard">
      <div className={styles.dash}>
        <h1>Dashboard</h1>
        <h3>My Posts</h3>

        {posts.map((post) => (
          <DashboardPost key={post.id} post={post} handleDelete={deletePost} />
        ))}
      </div>
    </Layout>
  );
}

export async function getServerSideProps({ req }) {
  const { token } = parseCookies(req);

  const res = await fetch(`${API_URL}/api/posts/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const posts = await res.json();

  return {
    props: { posts: posts.data },
  };
}
