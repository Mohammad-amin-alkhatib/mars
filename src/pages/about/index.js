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

export default function About({ header }) {

    return (
        <>
            <Head>
                <title>About Us</title>
                <meta name="description" content="About Us Page" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>
            <div>
                <InrtoHeader header={header} />
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