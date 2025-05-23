// Packages
import React from "react";
import path from "path";
import fs from "fs";
// Components
import Head from "next/head";
import LetsWorkTogether from "@/components/LetsWorkTogether";
import Description from "@/components/Description";
import InrtoHeader from "@/components/IntroHeader";
// Styles
import styles from './SubService.module.scss';

const NewsPage = ({ header, chooseUs, serviceDescription, articles }) => {
    return (
        <>
            <div>
                <InrtoHeader header={header} className={styles.headerContainer} />
                {!!serviceDescription && <div
                    className={styles.discriptionHeader}
                    dangerouslySetInnerHTML={{ __html: serviceDescription }}
                />}
                {articles?.length && <Description items={articles} />}
                <LetsWorkTogether
                    className={styles.whyChooseSection}
                    {...chooseUs}
                />
            </div >
        </>
    )
}

export async function getStaticPaths() {
    const dirPath = path.join(process.cwd(), 'src/data/services/subServices');
    const files = fs.readdirSync(dirPath);
    if (!files.length) {
        return {
            paths: [],
            fallback: false,
        };
    }

    const paths = [];
    files.forEach(file => {
        const subServicesFiles = path.join(dirPath, file);

        const subServices = fs.readdirSync(subServicesFiles);

        if (!subServices.length) return;

        subServices.forEach(subService => {
            paths.push({
                params: { service: file, subService: subService.replace('.json', '') },
            });
        })

    });

    if (!paths.length) {
        return {
            paths: [],
            fallback: false,
        };
    }

    console.log('paths', paths);

    return {
        paths,
        fallback: false,
    };

}

export async function getStaticProps({ params }) {
    try {
        const { service, subService } = params;
        const filePath = path.join(process.cwd(), `src/data/services/subServices/${service}/${subService}.json`);
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
