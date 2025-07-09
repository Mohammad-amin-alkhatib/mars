import React, { useState } from "react";
import styles from "./HamMenuItems.module.scss";
import Plus from "../../assets/icons/plus.svg";
import navBarData from "../../data/NavBar/navBar.json";
import ChevronLeft from "../../assets/icons/arrow.svg";

const HamMenuItems = ({ isOpen, level = 0, items = navBarData, onBack }) => {
  const [expandedItems, setExpandedItems] = useState({});

  if (!isOpen) return null;

  const toggleDropdown = (e, index) => {
    e.preventDefault();
    setExpandedItems((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <div className={`${styles.mobileMenu} ${level > 0 ? styles.nestedMenu : ""}`}>
      {level > 0 && (
        <div className={styles.backIcon} onClick={onBack}>
          <ChevronLeft />
        </div>
      )}

      <nav className={styles.navLinks}>
        {items.map((item, index) => {
          const isExpanded = expandedItems[index];
          const hasDropdown = item.hasDropDown && item.dropDownItems?.length > 0;

          return (
            <div key={index} className={styles.menuItemContainer}>
              <a
                href={hasDropdown ? "#" : item.url}
                className={styles.navLink}
                onClick={hasDropdown ? (e) => toggleDropdown(e, index) : undefined}
              >
                {item.title}
                {hasDropdown && (
                  <Plus className={isExpanded ? styles.rotated : ""} />
                )}
              </a>

              {/* Nested Dropdowns */}
              {hasDropdown && isExpanded && item.dropDownItems && (
                <HamMenuItems
                  isOpen={true}
                  level={level + 1}
                  items={item.dropDownItems}
                  onBack={() =>
                    setExpandedItems((prev) => ({
                      ...prev,
                      [index]: false,
                    }))
                  }
                />
              )}

              {/* Sub-items like menuItems shown at level 1 */}
              {item.menuItems && Array.isArray(item.menuItems) && (
                <div className={styles.subItemsContainer}>
                  <ul className={styles.subItemsList}>
                    {item.menuItems.map((subItem, subIndex) => (
                      <li key={subIndex} className={styles.subItem}>
                        <a
                          href={subItem.url}
                          className={styles.subItemLink}
                        >
                          {subItem.subItem}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          );
        })}

        {level === 0 && (
          <div className={styles.contactButtonContainer}>
            <a href="/contact" className={styles.contactButton}>
              CONTACT
            </a>
          </div>
        )}
      </nav>
    </div>
  );
};

export default HamMenuItems;
