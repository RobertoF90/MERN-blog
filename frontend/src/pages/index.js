import Head from 'next/head';
import Image from 'next/image';
import { Inter } from 'next/font/google';
import styles from '@/styles/Home.module.css';
import Link from 'next/link';

import Layout from '../components/layout';

import useSWR from 'swr';

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  const { data, error, isLoading } = useSWR(
    'http://localhost:5000/api/v1/posts',
    fetcher
  );

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <h2>
          {data?.map((post) => (
            <div key={post._id}>
              <div>{post.title}</div>
              <div>{post.text}</div>

              <Link href={`/posts/${post._id}`}>Read Post</Link>
            </div>
          ))}
        </h2>
      </main>
    </>
  );
}
