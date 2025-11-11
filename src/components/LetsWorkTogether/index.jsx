import ArrowButton from '../ArrowButton';
import Separator from '../Separator';
import styles from './LetsWorkTogether.module.scss';
import cx from 'classnames';

import { useEffect, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';

const LetsWorkTogether = ({
    className,
    imgSrc,
    description,
    divisions,
    href,
    textButton,
    darkMode = false,
    descriptionTitle,
    showSeparator = true,
    pdfFile,
    title,
    hrefHeader,
    ctaHeader
}) => {
    const listStyle = Array.isArray(description);
    const [isMobile, setIsMobile] = useState(false);

    const { ref, inView } = useInView({
        threshold: 0.1,
    });

    const titleRef = useRef(null);

    // Detect mobile viewport
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        handleResize();
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

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
                {/* Mobile Image - Shows ABOVE content on mobile */}
                {!!imgSrc && isMobile && (
                    <div className={styles.iconAbove}>
                        <img src={imgSrc} alt={title || "Section image"} />
                    </div>
                )}

                {/* TITLE WITH ANIMATION */}
                <div className={styles.revealTextWrapper}>
                    <h2 className={styles.revealText} ref={titleRef}>{title}</h2>
                    {inView && <div className={styles.revealOverlay}></div>}
                </div>

                {showSeparator && <Separator className={styles.separator} />}

                {!!descriptionTitle &&  <div className={styles.descriptionTitle}>{descriptionTitle}</div>}
                                
                {!!description?.length && !listStyle && (
                    <span
                        className={styles.description}
                        dangerouslySetInnerHTML={{ __html: description }}
                    ></span>
                )}

                {!!divisions?.length && (
                    <ul className={styles.divisionsList}>
                        {divisions.map((item, index) => (
                            <li key={index} className={styles.divisionItem}>
                                <span className={styles.divisionDot} />
                                {item}
                            </li>
                        ))}
                    </ul>
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
                
                {!!hrefHeader && (
                    <a href={`/pdfs/${hrefHeader}`} className={styles.linkDownload} download>
                        {ctaHeader}
                    </a>
                )}
                
                {href && <ArrowButton text={textButton} href={href} />}
                
                {pdfFile && (
                    <a
                        href={`/pdfs/${pdfFile}`}
                        download
                        className={styles.downloadButton}
                    >
                        Download Brochure
                    </a>
                )}
            </div>
            
            {/* Desktop Image - Shows BESIDE content on desktop */}
            {!!imgSrc && !isMobile && (
                <div className={styles.icon}>
                    <img src={imgSrc} alt={title || "Section image"} />
                </div>
            )}
        </div>
    );
};

export default LetsWorkTogether;