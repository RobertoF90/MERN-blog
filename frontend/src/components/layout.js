import Head from 'next/head';
import styles from './layout.module.css';
import Header from './Header';
import SideMenu from './SideMenu';

export default function Layout({ title, description, keywords, children }) {
  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description}></meta>
        <meta name="keywords" content={keywords}></meta>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* <link rel="icon" href="/favicon.ico" /> */}
      </Head>
      <Header></Header>

      <main className={styles.main}>
        <SideMenu />

        <div className={styles.container}>{children}</div>
      </main>
    </div>
  );
}

Layout.defaultProps = {
  title: 'Blog',
  description: 'Blog with next.js',
  keywords: 'blog, next, react',
};
