import Link from 'next/link';
import { FaPen, FaPencilAlt, FaTimes } from 'react-icons/fa';
import styles from '@/styles/DashboardPost.module.css';

export default function DashboardPost({ post, handleDelete }) {
  return (
    <div className={styles.post}>
      <h4>
        <Link href={`/posts/${post.attributes.slug}`}>
          {post.attributes.title}
        </Link>
      </h4>

      <Link href={`/posts/edit/${post.attributes.slug}`}>
        <div className={styles.edit}>
          <FaPencilAlt /> <span>Edit Post</span>
        </div>
      </Link>
      <button className={styles.delete} onClick={() => handleDelete(post.id)}>
        <FaTimes /> <span>Delete</span>
      </button>
    </div>
  );
}
