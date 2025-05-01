import React from "react";
import path from "path";
import fs from "fs";

const CareersPage = () => {
    return (
        <div>Hii</div>
    )
}


export async function getStaticProps() {
    const filePath = path.join(process.cwd(), 'src/data/careersPage.json');
    const jsonData = fs.readFileSync(filePath, 'utf8');
    const data = JSON.parse(jsonData) || {};

    return {
        props: {
            ...data,
        },
    };
}

export default CareersPage;