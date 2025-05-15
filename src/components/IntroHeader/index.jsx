// Packages
import cx from "classnames";
// Components
import DesktopNavBar from "../DesktopNavBar";
import MobileNavBar from "../MobileNavBar";
import LetsWorkTogether from "../LetsWorkTogether";
// Styles
import styles from "./IntroHeader.module.scss";

const InrtoHeader = ({ header, className }) => {
    return (
        <div
            className={cx(styles.headerContainer,
                { [styles.headerContainerImage]: !header?.imgSrc }
                , className)}
            {...(header?.imgSrc && {
                style: {
                    background: `url(${header.imgSrc}) no-repeat 100% 35%`,
                    backgroundSize: header.coverImage ? "cover" : "",
                },
            })}>
            {header?.videoUrl &&
                <video
                    autoPlay
                    muted
                    loop
                    controls={false}
                    playsInline
                    className={styles.video}
                    onContextMenu={(e) => e.preventDefault()}
                >
                    <source src={header.videoUrl} type="video/mp4" />
                </video>
            }
            <DesktopNavBar />
            <MobileNavBar />
            <LetsWorkTogether
                title={header?.title}
                description={header?.description}
                className={styles.header}
                showSeparator={header?.showSeparator}
                {...header}
            />
        </div>
    );
}

export default InrtoHeader;