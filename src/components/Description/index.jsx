import React from "react";
import styles from "./Description.module.scss";

const Description = ({ items }) => {
  return (
    <div className={styles.descContainer}>
      {items.map((item) => (
        <div key={item.title} className={styles.descWrapper}>
            <img src={`/${item.imgSrc}`} />
            <div className={styles.titleContainer}>
                <h1>{item.title}</h1>
                <p>{item.description}</p>
            </div>
        </div>
      ))}
    </div>
  );
};

export default Description;
