import { parseCookies } from '@/helpers/index';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import Layout from '@/components/layout';
import DashboardPost from '@/components/DashboardPost';
import { API_URL } from '@/config';
import styles from '@/styles/Dashboard.module.css';

export default function DashboardPage({ posts, token }) {
  const router = useRouter();
  const deletePost = async (id) => {
    if (confirm('Are you sure?')) {
      const res = await fetch(`${API_URL}/api/posts/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message);
      } else {
        router.reload();
      }
    }
  };

  return (
    <Layout title="User Dashboard">
      <div className={styles.dash}>
        <h1>Dashboard</h1>
        <h3>My Posts</h3>

        {posts &&
          posts.map((post) => (
            <DashboardPost
              key={post.id}
              post={post}
              handleDelete={deletePost}
            />
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
    props: { posts: posts.data, token },
  };
}
