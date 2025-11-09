// Packages
import React from "react";
import path from "path";
import fs from "fs";
import Head from "next/head";
// Components
import InrtoHeader from '@/components/IntroHeader';
// Styles
import styles from './NewsPage.module.scss';

const NewsPage = ({ header, content, metadata }) => {
    const { isVideo, src, paragraphs } = content;

    const handleShare = (platform) => {
        const url = window.location.href;
        const title = header?.title || 'MARS News';
        
        const shareUrls = {
            twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
            facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
            linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
            email: `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(url)}`
        };

        if (shareUrls[platform]) {
            window.open(shareUrls[platform], '_blank', 'width=600,height=400');
        }
    };

    const formatDate = (dateString) => {
        // You can customize this based on your date format
        const date = new Date();
        return date.toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });
    };

    return (
        <>
            <Head>
                <title>{header?.title || 'MARS News Article'}</title>
                <meta name="description" content={header?.subtitle || ''} />
                <meta property="og:title" content={header?.title || 'MARS News Article'} />
                <meta property="og:image" content={src} />
            </Head>
            <InrtoHeader header={header} />
            <div className={styles.content}>
                {/* Article Metadata */}
                {metadata && (
                    <div className={styles.articleMeta}>
                        <span className={styles.category}>
                            {metadata.category || 'Investment'}
                        </span>
                        <span className={styles.metaItem}>
                            {formatDate(metadata.date)}
                        </span>
                        {metadata.readTime && (
                            <span className={styles.metaItem}>
                                {metadata.readTime} min read
                            </span>
                        )}
                        {metadata.author && (
                            <span className={styles.metaItem}>
                                By {metadata.author}
                            </span>
                        )}
                    </div>
                )}

                {/* Media Content */}
                <div className={styles.mediaContainer}>
                    {isVideo && (
                        <video
                            className={styles.video}
                            controls
                            playsInline
                            poster={src.replace('.mp4', '-poster.jpg')}
                        >
                            <source src={src} type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    )}
                    {!isVideo && (
                        <img
                            className={styles.image}
                            src={src}
                            alt={header?.title || 'Article image'}
                            loading="eager"
                        />
                    )}
                </div>

                {/* Article Content */}
                <article className={styles.text}>
                    {paragraphs.map((item, index) => (
                        <p key={index} className={styles.textContent}>
                            {item}
                        </p>
                    ))}
                </article>

                {/* Share Section */}
                <div className={styles.shareSection}>
                    <span className={styles.shareLabel}>Share this article:</span>
                    <div className={styles.shareButtons}>
                        <button 
                            className={styles.shareButton}
                            onClick={() => handleShare('twitter')}
                            aria-label="Share on Twitter"
                        >
                            𝕏
                        </button>
                        <button 
                            className={styles.shareButton}
                            onClick={() => handleShare('facebook')}
                            aria-label="Share on Facebook"
                        >
                            f
                        </button>
                        <button 
                            className={styles.shareButton}
                            onClick={() => handleShare('linkedin')}
                            aria-label="Share on LinkedIn"
                        >
                            in
                        </button>
                        <button 
                            className={styles.shareButton}
                            onClick={() => handleShare('email')}
                            aria-label="Share via Email"
                        >
                            ✉
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export async function getStaticPaths() {
    const dirPath = path.join(process.cwd(), 'src/data/news');
    const files = fs.readdirSync(dirPath);
    const paths = files.map(file => {
        const id = file.replace('.json', '');
        return {
            params: { id },
        };
    });

    if (paths.length === 0) {
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

export default NewsPage;