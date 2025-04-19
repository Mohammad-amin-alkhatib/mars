import React from "react";
import styles from "./DropDownMenu.module.scss";

const DropDownMenu = ({ items }) => {
  return (
    <div className={styles.dropDownContainer}>
      {items.map((item) => (
        <div key={item.title} className={styles.dropDownWrapper}>
          <a href={item.url} className={styles.dropDownTitle}>{item.title}</a>
          {item.menuItems?.map((item, index) => (
            <a key={index} className={styles.subItem} href={item.url}>
              {item.subItem}
            </a>
          ))}
        </div>
      ))}
    </div>
  );
};

export default DropDownMenu;
