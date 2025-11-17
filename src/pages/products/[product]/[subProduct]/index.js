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
import styles from "./SubProductPage.module.scss";
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
                {!isMobile ? <DesktopNavBar /> : <MobileNavBar />}
                
                <LetsWorkTogether {...header} 
                 className={styles.headerContainer}
                />
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
