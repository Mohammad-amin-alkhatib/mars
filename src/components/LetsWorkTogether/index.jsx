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
    textButton,
    darkMode = false,
    descriptionTitle,
    showSeparator = true,
    pdfFile,
    title
}) => {
    const listStyle = Array.isArray(description);

    const { ref, inView } = useInView({
        threshold: 0.1,
    });

    const titleRef = useRef(null);

    useEffect(() => {
        if (titleRef.current) {
            titleRef.current.style.opacity = inView ? '1' : '0';
        }
    }, [inView]);

    return (
        <div
            className={cx(styles.container, {
                [styles.darkMode]: darkMode,
            }, className)}
            ref={ref}
        >
            <div className={styles.textPart}>
                {!!imgSrc && <div className={styles.iconAbove}>
                    <img src={imgSrc} />
                </div>}

                {/* TITLE WITH ANIMATION */}
                <div className={styles.revealTextWrapper}>
                    <h2 className={styles.revealText} ref={titleRef}>{title}</h2>
                    {inView && <div className={styles.revealOverlay}></div>}
                </div>

                {showSeparator && <Separator className={styles.separator} />}
                {!!descriptionTitle && <div className={styles.descriptionTitle}>{descriptionTitle}</div>}
                {!!description?.length && !listStyle && (
                    <div
                        className={styles.description}
                        dangerouslySetInnerHTML={{ __html: description }}
                    ></div>
                )}
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
                {href && <ArrowButton text={textButton} href={href} />}
                {pdfFile && (
                    <a
                        href={`/pdfs/${pdfFile}`}
                        download
                        className={styles.downloadButton}
                    >
                        Download Brouchure
                    </a>
                )}
            </div>
            {!!imgSrc && (
                <div className={styles.icon}>
                    <img src={imgSrc} />
                </div>
            )}
        </div>
    );
};

export default LetsWorkTogether;
