// Packages
import React from "react";
import path from "path";
import fs from "fs";
import cx from "classnames";
// Components
import Head from "next/head";
import InrtoHeader from "@/components/IntroHeader";
// Styles
import styles from "./about.module.scss";
import LetsWorkTogether from "@/components/LetsWorkTogether";

export default function About({ header, ourMission, ourVision }) {

    return (
        <>
            <Head>
                <title>About Us</title>
                <meta name="description" content="About Us Page" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>
            <div>
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