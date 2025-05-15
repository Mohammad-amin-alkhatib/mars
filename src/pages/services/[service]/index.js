// Packages
import React from "react";
import path from "path";
import fs from "fs";
// Components
import Head from "next/head";
import LetsWorkTogether from "@/components/LetsWorkTogether";
import InrtoHeader from "@/components/IntroHeader";
import CardContainer from "@/components/CardContainer";
import Description from "@/components/Description";
// Styles
import styles from './Services.module.scss';

const NewsPage = ({ header, chooseUs, serviceDescription, subServices, articles }) => {
    return (
        <>
            <div>
                <InrtoHeader header={header} className={styles.headerContainer} />
                {!!serviceDescription && <div
                    className={styles.discriptionHeader}
                    dangerouslySetInnerHTML={{ __html: serviceDescription }}
                />}
                {subServices?.length && <CardContainer cards={subServices} className={styles.cardContainer} />}
                {articles?.length && <Description items={articles} />}
                <LetsWorkTogether
                    className={styles.whyChooseSection}
                    title={chooseUs?.title}
                    imgSrc={chooseUs?.imgSrc}
                    description={chooseUs?.description}
                />
            </div >
        </>
    )
}

export async function getStaticPaths() {
    const dirPath = path.join(process.cwd(), 'src/data/services');
    const files = fs.readdirSync(dirPath);
    const paths = files.map(file => {
        const id = file.replace('.json', '');
        return {
            params: { service: id },
        };
    });

    if (paths.length > 0) {
        console.warn('No paths found');
    }

    return {
        paths,
        fallback: false,
    };
}

export async function getStaticProps({ params }) {
    try {
        const { service } = params;
        const filePath = path.join(process.cwd(), `src/data/services/${service}.json`);
        const jsonData = fs.readFileSync(filePath, 'utf8');
        const data = JSON.parse(jsonData) || {};

        return {
            props: {
                ...data,
            },
        };
    } catch (error) {
        return {
            notFound: true,
        };
    }
}

export default NewsPage
