// Packages
import React from "react";
import path from "path";
import fs from "fs";
import cx from "classnames";
import Head from "next/head";
// Components
import CaraouselSlider from "@/components/CarouselSlider";
import InrtoHeader from "@/components/IntroHeader";
import LetsWorkTogether from "@/components/LetsWorkTogether";
import PersonCard from "@/components/PersonCard";
// Styles
import styles from "./about.module.scss";
// Assets
import Arrow from "@/assets/icons/arrow-no-bg.svg";

const breakpoints = {
    medium: '768px',
    large: '1024px',
    xlarge: '1280px',
    small: '480px',
};

function parseBreakpoint(breakpoint) {
    return parseInt(breakpoint, 10);
}

function getBreakPoints() {
    return {
        spaceBetween: 20,
        breakpoints: {
            [parseBreakpoint(breakpoints.small)]: {
                slidesPerView: 1.5,
            },
            [parseBreakpoint(breakpoints.medium)]: {
                slidesPerView: 2.5,
            },
            [parseBreakpoint(breakpoints.large)]: {
                slidesPerView: 3.5,
            },
        },
    };
};

export default function About({ header, ourMission, ourVision }) {
    const prevRefCustom = React.useRef(null);
    const nextRefCustom = React.useRef(null);
    const paginationRef = React.useRef(null);

    return (
        <>
            <Head>
                <title>About Us</title>
                <meta name="description" content="About Us Page" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>
            <div className="aboutPage">
                <InrtoHeader header={header} />
                <LetsWorkTogether
                    title={ourMission.title}
                    description={ourMission.description}
                    imgSrc={ourMission.imgSrc}
                    className={styles.ourMission}
                    descriptionTitle={ourMission.descriptionTitle}
                    darkMode
                />
                <LetsWorkTogether
                    title={ourVision.title}
                    description={ourVision.description}
                    imgSrc={ourVision.imgSrc}
                    className={styles.ourVision}
                />
                <div className={styles.meetOurTeam}>
                    <LetsWorkTogether title={"Meet Our Team"} className={styles.meetOurTeamTitleSection} />
                    <CaraouselSlider
                        {...getBreakPoints(10)}
                        prevRefCustom={prevRefCustom}
                        nextRefCustom={nextRefCustom}
                        containerProps={{ className: styles.carousel }}
                        paginationRefCustom={paginationRef}
                    >
                        {Array.from({ length: 10 }, (_, i) => (
                            <PersonCard
                                key={i}
                                name={"John Doe"}
                                jobTitle={"Software Engineer"}
                                imgSrc={"/vision.svg"}
                                href={"/"}
                            />
                        ))}
                    </CaraouselSlider>
                    <div className={styles.carouselControls}>
                        <button ref={prevRefCustom} className={styles.arrowRight}><Arrow /></button>
                        <div ref={paginationRef} className={cx('swiper-pagination', styles.dots)} role="tablist"></div>
                        <button ref={nextRefCustom}><Arrow /></button>
                    </div>
                </div>
            </div>
        </>
    );
}

export async function getStaticProps() {
    const filePath = path.join(process.cwd(), 'src/data/aboutPage.json');
    const jsonData = fs.readFileSync(filePath, 'utf8');
    const data = JSON.parse(jsonData) || {};

    return {
        props: {
            ...data,
        },
    };
}