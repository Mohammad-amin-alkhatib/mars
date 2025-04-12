// Packages
import React from "react";
import path from "path";
import fs from "fs";
// Components
import InrtoHeader from '@/components/IntroHeader';
// Styles
import styles from './NewsPage.module.scss';

const NewsPage = ({ header, content }) => {
    const { isVideo, src, paragraphs } = content;

    return (
        <>
            <InrtoHeader header={header} />
            <div className={styles.content}>
                {isVideo && (
                    <video
                        className={styles.video}
                        controls
                        playsInline
                    >
                        <source src={src} type="video/mp4" />
                    </video>
                )}
                {!isVideo && (
                    <img
                        className={styles.image}
                        src={src}

                    />
                )}

                <div className={styles.text}>
                    {paragraphs.map((item, index) => (
                        <p key={index} className={styles.textContent}>
                            {item}
                        </p>
                    ))}
                </div>
            </div>
        </>
    )
}

export async function getStaticPaths() {
    const dirPath = path.join(process.cwd(), 'src/data/news');
    const files = fs.readdirSync(dirPath);
    const paths = files.map(file => {
        const id = file.replace('.json', '');
        return {
            params: { id },
        };
    });

    if (paths.length > 0) {
        console.warn('No paths found');
    }

    return {
        paths,
        fallback: false,
    };
}

export async function getStaticProps({ params }) {
    const { id } = params;
    const filePath = path.join(process.cwd(), `src/data/news/${id}.json`);
    const jsonData = fs.readFileSync(filePath, 'utf8');
    const data = JSON.parse(jsonData) || {};

    return {
        props: {
            ...data,
        },
    };
}

export default NewsPage
