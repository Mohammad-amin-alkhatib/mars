import React, { useState, useEffect } from "react";
import styles from "./DesktopNavBar.module.scss";
import navBarData from "../../data/NavBar/navBar.json";
import MarsLogo from "../../assets/icons/mars-logo.svg";
import Plus from "../../assets/icons/plus.svg";
import Minus from "../../assets/icons/minus.svg";
import DropDownMenu from "@/components/DropDownMenu";
import cx from "classnames";

const DesktopNavBar = () => {
  const [isHoveredItem, setIsHoveredItem] = useState(null);
  const [isHoveredBtn, setIsHoveredBtn] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      // Calculate scroll percentage (0 to 1)
      const scrollPercent = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
      
      // Set scrolled state based on scroll position
      setScrolled(window.scrollY > 0);

      // Update navbar background opacity (max 0.9)
      const navbar = document.querySelector(`.${styles.navBarContainer}`);
      if (navbar) {
        const opacity = Math.min(scrollPercent * 0.9, 0.9);
        navbar.style.backgroundColor = `rgba(255, 255, 255, ${opacity})`;
      }

      // Detect current section
      const sections = document.querySelectorAll('section[id]');
      sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 100 && rect.bottom >= 100) {
          setActiveSection(section.id);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={cx(styles.navBarContainer, { [styles.scrolled]: scrolled })}>
      <a href="/">
        <MarsLogo className={styles.mainLogo} />
      </a>
      <div className={styles.subItemsWrapper}>
        {navBarData.map((item) => (
          <div
            key={item.title}
            className={styles.navItemWrapper}
            onMouseEnter={() => item.hasDropDown && setIsHoveredItem(item.title)}
            onMouseLeave={() => setIsHoveredItem(null)}
          >
            <div className={styles.itemWrapper}>
              {item.hasDropDown && isHoveredItem !== item.title && <Plus />}
              {item.hasDropDown && isHoveredItem === item.title && (
                <Minus className={styles.minusIcon} />
              )}
              <a
                className={cx(styles.subNavItem, {
                  [styles.unHover]: isHoveredItem !== item.title,
                  [styles.active]: activeSection === item.url.replace('/', '')
                })}
                href={item.url}
              >
                {item.title}
              </a>
            </div>
            {item.hasDropDown && isHoveredItem === item.title && (
              <DropDownMenu items={item.dropDownItems} />
            )}
          </div>
        ))}
        <a
          className={cx(styles.contactBtn, {
            [styles.btnUnHover]: !isHoveredBtn,
          })}
          onMouseEnter={() => setIsHoveredBtn(true)}
          onMouseLeave={() => setIsHoveredBtn(false)}
          href="/contact"
        >
          Contact
        </a>
      </div>
    </div>
  );
};

export default DesktopNavBar;