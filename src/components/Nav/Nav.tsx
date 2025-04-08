import { getMenu } from "@/lib/shopify";
import styles from "./Nav.module.css";

import Search from "../Search/Search";

export async function Nav() {
  const menu = await getMenu("next-js-frontend-menu");
  console.log(menu);

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <div className={styles.left}>Logo Here</div>
        <div className={styles.middle}>
          <Search />
        </div>
        <div className={styles.right}>
          {/* <ul className={styles.menu}>
            {menu.map((item: Menu) => (
              <li key={item.title}>
                <Link href={item.path} prefetch={true}>
                  {item.title}
                </Link>
              </li>
            ))}
          </ul> */}
          <div className={styles.iconContainer}>
            {/* <Cart className={styles.icon} /> */}
            Cart Here
          </div>
        </div>
      </nav>
    </header>
  );
}
