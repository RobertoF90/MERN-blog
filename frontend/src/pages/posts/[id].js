import Layout from '../../components/layout';
import { getAllPostIds, getPostData } from '../../lib/posts';

import Link from 'next/link';

export async function getStaticProps({ params }) {
  const postData = await getPostData(params.id);
  return {
    props: {
      postData,
    },
  };
}

export async function getStaticPaths() {
  console.log('calling get all post ids');
  const paths = await getAllPostIds();
  return {
    paths,
    fallback: false,
  };
}

export default function Post({ postData }) {
  console.log(postData);
  return (
    <Layout>
      {postData.post.title}

      <br />
      {postData.post.text}
      <br />

      <Link href="/">Back to home</Link>
    </Layout>
  );
}
