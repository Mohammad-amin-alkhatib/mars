import Link from "next/link";
import Arrow from '@/assets/icons/arrow.svg';
import styles from "./ArrowButton.module.scss";
import cx from 'classnames';
import CaretRight from '@/assets/icons/arrow.svg';
const ArrowButton = ({ text, className, href }) => {
    return (
        <Link href={href} className={cx(styles.container, className)}>
            <CaretRight className={styles.arrow} />
            <span className={styles.text}>
                {text}
            </span>
        </Link>
    )
};

export default ArrowButton;