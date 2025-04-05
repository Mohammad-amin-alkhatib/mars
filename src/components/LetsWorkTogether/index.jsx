import ArrowButton from '../ArrowButton';
import Separator from '../Separator';
import styles from './LetsWorkTogether.module.scss';
import cx from 'classnames';

import { useEffect, useRef } from 'react';
import { useInView } from 'react-intersection-observer';

const LetsWorkTogether = ({
    className,
    imgSrc,
    description,
    href,
    listStyle,
    title }) => {

    const { ref, inView } = useInView({
        threshold: 0.5,
    });

    const titleRef = useRef(null);

    useEffect(() => {
        if (titleRef.current) {
            if (inView) {
                console.log('Adding scaleAnimation');
                titleRef.current.classList.add(styles.scaleAnimation);
            } else {
                console.log('Removing scaleAnimation');
                titleRef.current.classList.remove(styles.scaleAnimation);
            }
        }
    }, [inView]);

    const titleClassName = cx(styles.title, {
        [styles.scaleAnimation]: inView,
    });

    return (
        <div className={cx(styles.container, className)} ref={ref}>
            <div className={styles.textPart}>
                <h2 className={titleClassName} ref={titleRef}>{title}</h2>
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
            </div>}
        </div>
    );
}

export default LetsWorkTogether;
