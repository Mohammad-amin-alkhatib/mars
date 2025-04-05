import React from "react";
import styles from "./HamMenuItems.module.scss";
import navBarData from "../../data/NavBar/navBar.json";

const HamMenuItems = ({ isOpen }) => {
  if (!isOpen) return null;

  return (
	<div className={styles.mobileMenu}>
	  <nav className={styles.navLinks}>
		{navBarData.map((item, index) => (
		  <a
			href={`#${item.title.toLowerCase()}`}
			className={styles.navLink}
			key={index}
		  >
			{item.title}
		  </a>
		))}
		<div className={styles.contactButtonContainer}>
		  <a href="#contact" className={styles.contactButton}>
			CONTACT
		  </a>
		</div>
	  </nav>
	</div>
  );
};

export default HamMenuItems;
