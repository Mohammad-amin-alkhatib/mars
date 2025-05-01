import React, { useState } from "react";
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

  return (
    <div className={styles.navBarContainer}>
      <a href="/">
        <MarsLogo className={styles.mainLogo} />
      </a>
      <div className={styles.subItemsWrapper}>
        {navBarData.map((item) => (
          <div
            key={item.title}
            className={styles.navItemWrapper}
            onMouseEnter={() =>
              item.hasDropDown && setIsHoveredItem(item.title)
            }
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
