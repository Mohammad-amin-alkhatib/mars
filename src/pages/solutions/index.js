// Packages
import React from "react";
import path from "path";
import fs from "fs";
// Components
import InrtoHeader from "@/components/IntroHeader";
import Banner from "@/components/Banner";
import LetsWorkTogether from "@/components/LetsWorkTogether";
// Styles
import styles from './SolutionsPage.module.scss';
import Card from "@/components/Card";

const SolutionsPage = ({ header, banner, letsWorkTogether, solutions }) => {

    return (
        <>
            <InrtoHeader header={header} />
            <Banner
                title={banner?.title}
                text={banner?.text}
            />
            <div className={styles.solutions}>
                <div className={styles.containerServices}>
                    {solutions?.cards.map((card, index) => (
                        <Card
                            key={index}
                            description={card.description}
                            title={card.title}
                            image={card.imgSrc}
                            href={card.href}
                        />
                    ))}
                </div>
                {solutions.description && (
                    <p className={styles.solutionsDescription}>
                        {solutions.description}
                    </p>)
                }
            </div>
            <LetsWorkTogether
                className={styles.whyChooseSection}
               {...letsWorkTogether}
            />
        </>
    )
}

export async function getStaticProps() {
    const filePath = path.join(process.cwd(), 'src/data/solutionsPage.json');
    const jsonData = fs.readFileSync(filePath, 'utf8');
    const data = JSON.parse(jsonData) || {};

    return {
        props: {
            ...data
        },
    };
}

export default SolutionsPage;