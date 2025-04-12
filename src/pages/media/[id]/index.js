// Packages
import React from "react";
import path from "path";
import fs from "fs";
// Components
import InrtoHeader from '@/components/IntroHeader';

const NewsPage = ({ header }) => {
    return (
        <>
            <InrtoHeader header={header} />
        </>
    )
}

export async function getStaticPaths() {
    return {
        paths: [],
        fallback: false,
    };
}

export async function getStaticProps({ params }) {
    const { id } = params;
    const filePath = path.join(process.cwd(), `src/data/news/${id}.json`);
    const jsonData = fs.readFileSync(filePath, 'utf8');
    const data = JSON.parse(jsonData) || {};

    console.log('data', data);
    console.log('id', id);

    return {
        props: {
            ...data,
        },
    };
}

export default NewsPage
