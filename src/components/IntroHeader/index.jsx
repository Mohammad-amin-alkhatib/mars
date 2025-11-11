// Packages
import cx from "classnames";
import { useEffect, useState } from "react";
// Components
import DesktopNavBar from "../DesktopNavBar";
import MobileNavBar from "../MobileNavBar";
import LetsWorkTogether from "../LetsWorkTogether";
// Styles
import styles from "./IntroHeader.module.scss";

const IntroHeader = ({ header, className }) => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            // Check for mobile devices first
            const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
            
            // Use consistent breakpoint: 768px (matches SCSS medium breakpoint)
            const isMobileWidth = window.innerWidth <= 768;
            
            setIsMobile(isMobileDevice || isMobileWidth);
        };

        handleResize();
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <div className={cx(styles.headerContainer, className)}>
            {/* Background layer - only for desktop */}
            {!isMobile && header?.imgSrc && (
                <div 
                    className={styles.backgroundImage}
                    style={{
                        backgroundImage: `url(${header.imgSrc})`,
                        backgroundSize: header.coverImage ? "cover" : "",
                        backgroundPosition: header.coverImage ? "center" : "100% 35%",
                        backgroundRepeat: "no-repeat",
                        opacity: header.reduceOpacity ? header.reduceOpacity : 1,
                    }}
                />
            )}

            {/* Video background */}
            {header?.videoUrl && (
                <video
                    autoPlay
                    muted
                    loop
                    style={{ opacity: header.reduceOpacity ?? 0.5 }}
                    controls={false}
                    playsInline
                    className={styles.video}
                    onContextMenu={(e) => e.preventDefault()}
                >
                    <source src={header.videoUrl} type="video/mp4" />
                </video>
            )}

            {/* Content layer - always on top */}
            <div className={styles.contentLayer}>
                {isMobile ? <MobileNavBar /> : <DesktopNavBar />}
                
                {/* Mobile image - in content flow */}
                {isMobile && header?.imgSrc && (
                    <div className={styles.mobileImageContainer}>
                        <img 
                            src={header.imgSrc} 
                            alt={header.title || "Header"} 
                            className={styles.mobileImage}
                            style={{ opacity: header.reduceOpacity ? header.reduceOpacity : 1 }}
                        />
                    </div>
                )}

                <LetsWorkTogether
                    title={header?.title}
                    description={header?.description}
                    className={styles.header}
                    showSeparator={header?.showSeparator}
                    hrefHeader={header?.hrefHeader}
                    ctaHeader={header?.ctaHeader}
                />
            </div>
        </div>
    );
}

export default IntroHeader;