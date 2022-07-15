import React from "react";
import styles from "../styles/Navbar.module.css";
import { BiSearch } from "react-icons/bi";
import { GiHamburgerMenu, GiBottleVapors } from "react-icons/gi";
import { GrLanguage, GrFormNext, GrFilter } from "react-icons/gr";
import { GiBowTieRibbon, GiClothes, GiShop } from "react-icons/gi";
import Link from "next/link";

const Navbar = () => {
  const style = { color: "#252525" };

  return (
    <div className={styles.navbar}>
      <nav className={styles.nav}>
        <div className={styles.logo}>logo</div>
        <div className={styles.main_nav}>
          <ul>
            <Link href="/">
              <li>
                <article>Home</article>
              </li>
            </Link>
            <Link href="/Curlcure">
              <li>
                <a>Curl Cure</a>
              </li>
            </Link>
            <Link href="/Iraninaturals">
              <li>
                <a>Irani Naturals</a>
              </li>
            </Link>
          </ul>
          <div className={styles.search}>
            <BiSearch />
          </div>
        </div>
        <div className={styles.user}>
          <GrLanguage />
          <div className={styles.profile}>
            <GiHamburgerMenu />
            <div className={styles.profile_img}>
              <img src="https://picsum.photos/seed/picsum/200/300" alt="no" />
            </div>
          </div>
        </div>
      </nav>
      {/* <div className={styles.nav2}>
        <div className={styles.categories}>
          <div className={styles.icon}>
            <GiBottleVapors style={style} />
            <div className={styles.name}>Hair Cure</div>
          </div>
          <div className={styles.icon}>
            <GiBowTieRibbon style={style} />
            <div className={styles.name}>Merchandices</div>
          </div>
          <div className={styles.icon}>
            <GiClothes style={style} />
            <div className={styles.name}>Accessories</div>
          </div>
          <div className={styles.icon}>
            <GiShop style={style} />
            <div className={styles.name}>Salon</div>
          </div>
        </div>

        <div className={styles.filter}>
          <div className={styles.stylebx}>
            <GrFormNext />
          </div>
          <div className={styles.filterbx}>
            <GrFilter />
            Filter
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default Navbar;
