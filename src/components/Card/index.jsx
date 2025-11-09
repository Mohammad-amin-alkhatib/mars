import Image from "next/image";
import styles from "./Card.module.scss";
import { Space_Grotesk } from 'next/font/google'
import cx from 'classnames';
import ArrowButton from "../ArrowButton";

const spaceGrotesk = Space_Grotesk({
    display: 'swap',
    subsets: ['latin'],
})

const wrapLink = (href, children) => {
    if (href) {
        return (
            <a href={href} className={styles.link}>
                {children}
            </a>
        );
    }
    return children;
}

const Card = ({ title, description, image, href }) => {
    return (
        <div className={styles.container}>
            <div className={styles.image}>
                <img src={`/${image}`} alt={title} />
            </div>
            {wrapLink(href, <h2 className={styles.title}>{title}</h2>)}
            <div className={cx(styles.description, spaceGrotesk.className)}>{description}</div>
            {href && <ArrowButton text="Read full blog" href={href} className={styles.arrowButtonNoBg} />}
        </div>
    );
}

export default Card;