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

  import HorizontalLetsWorkTogether from '@/components/HorizontalLetsWorkTogether';



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
        slidesPerView: 1,
        breakpoints: {
            [parseBreakpoint(breakpoints.small)]: {
                slidesPerView: 1.5,
                spaceBetween: 10,
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
const CeoSection = () => {
    return (
      <section className={styles.ceoSection}>
        <div className={styles.ceoSection__content}>
          <h2 className={styles.ceoSection__title}>A Message from Our CEO</h2>
          <p className={styles.ceoSection__description}>
            "At our company, we believe in innovation, collaboration, and
            excellence. My advice to all aspiring professionals is to stay
            curious, embrace challenges, and never stop learning."
          </p>
        </div>
        <div className={styles.ceoSection__image}>
          <img
            src="/path-to-ceo-image.jpg"
            alt="CEO"
            className={styles.ceoImage}
          />
        </div>
      </section>
    );
  };
  

export default function About({ header, ourMission, ourVision, ourApproach,ceoSection, teamMembers, letsWorkTogether }) {
    const prevRefCustom = React.useRef(null);
    const nextRefCustom = React.useRef(null);
    const paginationRef = React.useRef(null);

    return (
        <>
            <div className="aboutPage">

                <InrtoHeader header={header} />
                
          <div className={styles.heroImageWrapper}>
        <img 
          src="/collage7.png" 
          alt="About Us - Our Journey" 
          className={styles.heroImage}
        />
      </div>

                

                 
<div className="aboutPage">
  <section className={styles.fullWidthSection}>
    <HorizontalLetsWorkTogether    
    title={ourVision.title}
  description={ourVision.description}
   
   />
  </section>
  <section className={styles.fullWidthSection}>
    <HorizontalLetsWorkTogether  title={ourApproach.title}
    descriptionTitle={ourApproach.descriptionTitle}
   description={ourApproach.description}
                    // imgSrc={ourApproach.imgSrc}
                        divisions={ourApproach.divisions}
  
  
   />
  </section>
  <section className={styles.fullWidthSection}>
    <HorizontalLetsWorkTogether   title={ourMission.title}
  description={ourMission.description}
  divisions={ourMission.divisions}
   
  descriptionTitle={ourMission.descriptionTitle}
   />
  </section>

   
</div>
   {CeoSection && (
                    <LetsWorkTogether 
                        title={ceoSection.title}
                        description={ceoSection.description}
                        imgSrc={ceoSection.imgSrc}
                        className={styles.ceoSection}
                        descriptionTitle={ceoSection.descriptionTitle}
                          role={ceoSection.role}
                           showBottomContent={true}
                    />
                )}

                {/* {teamMembers && (
                    <div className={styles.meetOurTeam}>
                        <LetsWorkTogether title={"Meet Our Team"} className={styles.meetOurTeamTitleSection} />
                        <CaraouselSlider
                            {...getBreakPoints(teamMembers.length)}
                            prevRefCustom={prevRefCustom}
                            nextRefCustom={nextRefCustom}
                            containerProps={{ className: styles.carousel }}
                            paginationRefCustom={paginationRef}
                        >
                            {teamMembers.map((member, i) => (
                                <PersonCard
                                    key={i}
                                    {...member}
                                />
                            ))}
                        </CaraouselSlider>
                        <div className={styles.carouselControls}>
                            <button ref={prevRefCustom} className={styles.arrowRight}><Arrow /></button>
                            <div ref={paginationRef} className={cx('swiper-pagination', styles.dots)} role="tablist"></div>
                            <button ref={nextRefCustom} className={styles.arrow}><Arrow /></button>
                        </div>
                    </div>
                )} */}
                <LetsWorkTogether
                    title={letsWorkTogether.title}
                    description={letsWorkTogether.description}
                    imgSrc={letsWorkTogether.imgSrc}
                    className={styles.workWithUs}
                    descriptionTitle={letsWorkTogether.descriptionTitle}

                />
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
// #767e87