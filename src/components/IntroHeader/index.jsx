// Packages
import cx from "classnames";
import { useEffect, useState } from "react";
// Components
import DesktopNavBar from "../DesktopNavBar";
import MobileNavBar from "../MobileNavBar";
import LetsWorkTogether from "../LetsWorkTogether";
// Styles
import styles from "./IntroHeader.module.scss";

const InrtoHeader = ({ header, className }) => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            console.log(navigator.userAgent, "isMobile: ", window.innerWidth <= 768);
            
            if (navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i)) {
                setIsMobile(true);
                return;
            }

            setIsMobile(window.innerWidth <= 1440);
        };

        handleResize();

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <div
            className={cx(styles.headerContainer,
                { [styles.headerContainerImage]: !header?.imgSrc }
                , className)}
            {...(header?.imgSrc && {
                style: {
                    background: `url(${header.imgSrc}) no-repeat 100% 35%`,
                    backgroundSize: header.coverImage ? "cover" : "",
                    backgroundBlendMode: header.reduceOpacity ? "overlay" : "",
                    backgroundColor: header.reduceOpacity ? `rgba(255, 255, 255, ${reduceOpacity})` : "",
                },
            })}>
            {header?.videoUrl &&
                <video
                    autoPlay
                    muted
                    loop
                    style={{ opacity: header.reduceOpacity ? 0.5 : 1 }}
                    controls={false}
                    playsInline
                    className={styles.video}
                    onContextMenu={(e) => e.preventDefault()}
                >
                    <source src={header.videoUrl} type="video/mp4" />
                </video>
            }
            {isMobile ? <MobileNavBar /> : <DesktopNavBar />}
            <LetsWorkTogether
                title={header?.title}
                description={header?.description}
                className={styles.header}
                showSeparator={header?.showSeparator}
                hrefHeader={header?.hrefHeader}
                ctaHeader={header?.ctaHeader}
            />
        </div>
    );
}

export default InrtoHeader;