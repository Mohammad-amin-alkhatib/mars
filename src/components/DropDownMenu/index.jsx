import React from "react";
import styles from "./DropDownMenu.module.scss";

const DropDownMenu = ({ items }) => {
  return (
    <div className={styles.dropDownContainer}>
      {items.map((item) => (
        <div key={item.title} className={styles.dropDownWrapper}>
          <span className={styles.dropDownTitle}>{item.title}</span>
          {item.menuItems?.map((item, index) => (
            <a key={index} className={styles.subItem}>
              {item.subItem}
            </a>
          ))}
        </div>
      ))}
    </div>
  );
};

export default DropDownMenu;
