import React from "react";
import styles from "./Description.module.scss";

const Description = ({ items }) => {
  return (
    <div className={styles.descContainer}>
      {items.map((item) => (
        <div key={item.title} className={styles.descWrapper}>
            <img></img>
            <div>
                <h1>{item.title}</h1>
                <p>{item.desc}</p>
            </div>
        </div>
      ))}
    </div>
  );
};

export default Description;
