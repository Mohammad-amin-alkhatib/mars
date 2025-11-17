// Packages
import React, { useEffect, useState } from "react";
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
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            console.log(navigator.userAgent, "isMobile: ", window.innerWidth <= 768);

            if (navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i)) {
                setIsMobile(true);
                return;
            }

            setIsMobile(window.innerWidth <= 1440);
        };

        handleResize();

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <>
            {header.coverImage ? <InrtoHeader header={header} /> : (<>
                {isMobile ? <MobileNavBar /> : <DesktopNavBar />}
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
