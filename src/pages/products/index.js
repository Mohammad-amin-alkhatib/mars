// Packages
import React from "react";
import path from "path";
import fs from "fs";
// Components
import CardContainer from "@/components/CardContainer";
import Head from "next/head";
import InrtoHeader from "@/components/IntroHeader";
import LetsWorkTogether from "@/components/LetsWorkTogether";
// Styles
import styles from "./ProductsPage.module.scss";


const ProductsPage = ({ header, products, letsWorkTogether, keyFeatures }) => {
    return (
        <div>
            <div>
                <InrtoHeader
                    header={header}
                />
                {products?.length && <CardContainer cards={products} className={styles.cardContainer}/>}
                <LetsWorkTogether
                    className={styles.letsWorkTogether}
                    {...letsWorkTogether}
                />
            </div>
        </div>
    );
}

export async function getStaticProps() {
    const filePath = path.join(process.cwd(), 'src/data/productsPage.json');
    const jsonData = fs.readFileSync(filePath, 'utf8');
    const data = JSON.parse(jsonData) || {};

    return {
        props: {
            ...data,
        },
    };
}

export default ProductsPage;

