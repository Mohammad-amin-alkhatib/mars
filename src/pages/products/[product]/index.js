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

const ProductPage = ({ header, keyFeatures }) => {
    return (
        <>
            <DesktopNavBar />
            <MobileNavBar />
            <LetsWorkTogether {...header} />
            {keyFeatures && <KeyFeatures keyFeaturesKeys={keyFeatures} />}
        </>
    )
}

export async function getStaticPaths() {
    const dirPath = path.join(process.cwd(), 'src/data/products');
    const files = fs.readdirSync(dirPath);
    const paths = files.map(file => {
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
