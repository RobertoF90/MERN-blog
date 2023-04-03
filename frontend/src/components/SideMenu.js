import styles from '@/styles/SideMenu.module.css';

function SideMenu() {
  return (
    <div className={styles.container}>
      <ul className={styles.menu}>
        <li className={styles.item}>1</li>
        <li className={styles.item}>1</li>
        <li className={styles.item}>1</li>
      </ul>
    </div>
  );
}

export default SideMenu;
