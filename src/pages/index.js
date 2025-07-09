// Packages
import React from "react";
import path from "path";
import fs from "fs";
// Components
import Head from "next/head";
import LetsWorkTogether from "@/components/LetsWorkTogether";
import Banner from "@/components/Banner";
import Card from "@/components/Card";
// Styles
import styles from "./index.module.scss";
// Assets
import InrtoHeader from "@/components/IntroHeader";
import dynamic from "next/dynamic";

export default function Home({
  banner,
  chooseUs,
  header,
  letsWorkTogether,
  services,
  ourPartners = []
}) {
  return (
    <>
      <div>
        <InrtoHeader header={header} />
        <Banner
          title={banner?.title}
          text={banner?.text}
        />
        <div className={styles.servicesSection}>
          <div className={styles.containerServices}>
            {services?.cards.map((card, index) => (
              <Card
                key={index}
                description={card.description}
                title={card.title}
                image={card.image}
                href={card.href}
              />
            ))}
          </div>
          {!!services?.description && <p className={styles.serviceDescription}> {services.description}</p>}
        </div>
        <LetsWorkTogether
          // className={styles.whyChooseSection}
          title={chooseUs?.title}
          imgSrc={chooseUs?.imgSrc}
          description={chooseUs?.description}
        />
        {!!ourPartners.length && (
          <div className={styles.scrollerWrapper}>
            <div className={styles.pixSection}>
              {ourPartners.map((icon, index) => {
                const Icon = dynamic(() => import(`../assets/icons/partners/${icon}.svg`), {
                  ssr: false,
                });

                return (
                  <div key={index} className={styles.pixIcon}>
                    <Icon />
                  </div>
                );
              })}
            </div>
          </div>
        )}
        <LetsWorkTogether
          title={letsWorkTogether?.title}
          description={letsWorkTogether?.description}
          href={letsWorkTogether?.href}
          imgSrc={letsWorkTogether?.imgSrc}
          textButton={letsWorkTogether?.buttonText}
        />
      </div >
    </>
  );
}


export async function getStaticProps() {
  const filePath = path.join(process.cwd(), 'src/data/homepage.json');
  const jsonData = fs.readFileSync(filePath, 'utf8');
  const data = JSON.parse(jsonData) || {};

  return {
    props: {
      ...data
    },
  };
}