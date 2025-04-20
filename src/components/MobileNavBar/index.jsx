import React, { useEffect, useState } from "react";
import styles from "./MobileNavBar.module.scss";
import MarsLogo from "../../assets/icons/mars-logo.svg";
import HamMenu from '../../assets/icons/ham-menu.svg';
import HamMenuItems from "@/components/HamMenuItems";
import cx from 'classnames';

const MobileNavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const htmlElement = document.querySelector("html");
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
      // get the html element
      htmlElement.style.overflow = "hidden";
    }
    else {
      document.body.style.overflow = "auto";
      htmlElement.style.overflow = "auto";
    }
  }, [isMenuOpen]);

  return (
    <div className={styles.navBarContainer}>
      <MarsLogo className={styles.logo}/>
      <div onClick={toggleMenu}>
        <HamMenu className={cx(styles.hamMenu, {[styles.menuOpen]: isMenuOpen})}/>
      </div>
      <HamMenuItems isOpen={isMenuOpen} />
    </div>
  );
};

export default MobileNavBar;