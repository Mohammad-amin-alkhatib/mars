import ArrowButton from '../ArrowButton';
import Separator from '../Separator';
import styles from './LetsWorkTogether.module.scss';
import cx from 'classnames';

const LetsWorkTogether = ({
    className,
    imgSrc,
    description,
    href,
    listStyle,
    title }) => {
    return (
        <div className={cx(styles.container, className)}>
            <div className={styles.textPart}>
                <h2 className={styles.title}>{title}</h2>
                <Separator className={styles.separator} />
                {!!description?.length && !listStyle && <p className={styles.description}>{description}</p>}
                {!!description?.length && listStyle && (
                    <ul className={styles.description}>
                        {description.map((item, index) => (
                            <li key={index} className={styles.listItem}>
                                <span className={styles.dot} />
                                {item}
                            </li>
                        ))}
                    </ul>
                )}
                {href && <ArrowButton text="Contact Us" href={href} />}
            </div>
            {!!imgSrc && <div className={styles.icon}>
                <img src={imgSrc} />
            </div>
            }
        </div>
    );
}

export default LetsWorkTogether;
