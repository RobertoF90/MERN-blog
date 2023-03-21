import { FaSignInAlt, FaSignOutAlt } from 'react-icons/fa';
import { useContext } from 'react';

import styles from '@/styles/Header.module.css';
import Link from 'next/link';
import Search from './Search';
import AuthContext from '@/context/AuthContext';

export default function Header() {
  const { user, logout } = useContext(AuthContext);

  return (
    <header className={styles.header}>
      <div>
        <Link href={'/'}>Home</Link>
      </div>
      <Search />

      <nav className={styles.nav}>
        <ul>
          {user ? (
            // if logged in
            <>
              <li>
                <Link href="/account/dashboard">Dashboard</Link>
              </li>
              <li>
                <Link href="/posts/add">Add Post</Link>
              </li>
              <li>
                <button onClick={() => logout()}>Logout</button>
              </li>
            </>
          ) : (
            // if logged out
            <>
              <li>
                <Link className="" href="/account/login">
                  <FaSignInAlt /> Login
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}
