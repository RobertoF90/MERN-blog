import Link from 'next/link';
import Image from 'next/image';
import styles from '@/styles/EventItem.module.css';

function PostItem({ post }) {
  return (
    <div className={styles.post}>
      <div>{post.attributes.title}</div>
      <div>{post.attributes.text}</div>

      {/* TESTING */}
      {post.attributes.image.data && (
        <Image
          src={post.attributes.image.data.attributes.url}
          alt={'image'}
          width={144}
          height={144}
        ></Image>
      )}

      <Link href={`/posts/${post.attributes.slug}`}>Read</Link>
    </div>
  );
}

export default PostItem;
