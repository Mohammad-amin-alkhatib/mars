// Packages
import React from "react";
import path from "path";
import fs from "fs";
// Components
import LetsWorkTogether from "@/components/LetsWorkTogether";
import MobileNavBar from "@/components/MobileNavBar";
import DesktopNavBar from "@/components/DesktopNavBar";
import KeyFeatures from "@/components/KeyFeatures";
// Styles
import styles from "./ProductPage.module.scss";
import CardContainer from "@/components/CardContainer";
import InrtoHeader from "@/components/IntroHeader";

const ProductPage = ({ header, keyFeatures, products, footer }) => {
    return (
        <>
            {header.coverImage ? <InrtoHeader header={header} /> : (<>
                <DesktopNavBar />
                <MobileNavBar />
                <LetsWorkTogether {...header} />
            </>)}
            {!!products?.length && <CardContainer cards={products} className={styles.productsContainer} />}
            {!!keyFeatures?.length && <KeyFeatures keyFeaturesKeys={keyFeatures} />}
            <LetsWorkTogether
                className={styles.letsWorkTogether}
                {...footer}
            />
        </>
    )
}

export async function getStaticPaths() {
    const dirPath = path.join(process.cwd(), 'src/data/products');
    const files = fs.readdirSync(dirPath);
    const paths = files.filter((file) => file.includes('.json')).map(file => {
        const id = file.replace('.json', '');

        return {
            params: { product: id },
        };
    });

    return {
        paths,
        fallback: false,
    };

}


export async function getStaticProps({ params }) {
    const { product } = params;

    const filePath = path.join(process.cwd(), 'src/data/products', `${product}.json`);
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const content = JSON.parse(fileContent) || {};

    return {
        props: {
            ...content,
        },
    };
}

export default ProductPage;
