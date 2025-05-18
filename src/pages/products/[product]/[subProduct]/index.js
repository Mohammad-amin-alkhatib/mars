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
import styles from "./SubProductPage.module.scss";
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
                title={footer?.title}
                imgSrc={footer?.imgSrc}
                description={footer?.description}
                href={footer?.href}
                pdfFile={footer?.pdfFile}
            />
        </>
    )
}

export async function getStaticPaths() {
    const dirPath = path.join(process.cwd(), 'src/data/products/subProducts');
    const files = fs.readdirSync(dirPath);
    if (!files.length) {
        return {
            paths: [],
            fallback: false,
        };
    }

    const paths = [];
    files.forEach(file => {
        const subFilers = path.join(dirPath, file);

        const subProductData = fs.readdirSync(subFilers);

        if (!subProductData.length) return;

        subProductData.forEach(subProduct => {
            paths.push({
                params: { product: file, subProduct: subProduct.replace('.json', '') },
            });
        })

    });

    if (!paths.length) {
        return {
            paths: [],
            fallback: false,
        };
    }

    return {
        paths,
        fallback: false,
    };

}


export async function getStaticProps({ params }) {
    const { product, subProduct } = params;
    const filePath = path.join(process.cwd(), 'src/data/products/subProducts', product, `${subProduct}.json`);
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const content = JSON.parse(fileContent) || {};

    return {
        props: {
            ...content,
        },
    };
}

export default ProductPage;
