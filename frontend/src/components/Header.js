import styles from '@/styles/Header.module.css';
import Link from 'next/link';
import Search from './Search';

export default function Header() {
  return (
    <header className={styles.header}>
      <div>
        <Link href={'/'}>Home</Link>
      </div>

      <Search />
    </header>
  );
}
