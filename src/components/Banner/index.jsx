import cx from 'classnames';
import styles from './Banner.module.scss';


const Banner = ({ title, text, className }) => {
    return (
        <div className={cx(styles.container, className)}>
            {!!title && <h2 className={styles.title}>{title}</h2>}
            {!!text && <p className={styles.text}>{text}</p>}
        </div>
    );
}

export default Banner;