// Packages
import React, { useEffect, useState } from "react";
import path from "path";
import fs from "fs";
// Components
import Head from "next/head";
import DesktopNavBar from "@/components/DesktopNavBar";
import MobileNavBar from "@/components/MobileNavBar";
import Pagination from "@/components/Pagination";
import LetsWorkTogether from "@/components/LetsWorkTogether";
// Styles
import styles from "./Media.module.scss";

const ContactPage = ({ header, news = [] }) => {
    const [currentPage, setCurrentPage] = React.useState(0);
    const [newsPerPage, setNewsPerPage] = React.useState(3);
    const currentNews = news?.slice(currentPage * newsPerPage, (currentPage * newsPerPage) + newsPerPage);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 769) {
                setNewsPerPage(4);
            } else {
                setNewsPerPage(3);
            }
        };

        handleResize();

        const handleResizeForUserAgent = () => {
            if (navigator.userAgent.match(/Android/i) || 
                navigator.userAgent.match(/iPhone/i) || 
                navigator.userAgent.match(/iPad/i)) {
                setIsMobile(true);
                return;
            }

            setIsMobile(window.innerWidth <= 1440);
        };

        handleResizeForUserAgent();

        window.addEventListener("resize", handleResizeForUserAgent);

        return () => {
            window.removeEventListener("resize", handleResizeForUserAgent);
        };
    }, []);

    // Format date for display


    return (
        <>
            <Head>
                <title>MARS News - Latest Investment Updates</title>
                <meta name="description" content={header?.description} />
            </Head>
            <div>
                {isMobile ? <MobileNavBar /> : <DesktopNavBar />}
                <LetsWorkTogether
                    title={header?.title}
                    description={header?.description}
                />
                {news && (
                    <div className={styles.news}>
                        <div className={styles.newsContainer}>
                            {currentNews?.map((newCard, index) => (
                                <a 
                                    key={index} 
                                    className={styles.newsItem} 
                                    href={'/media/' + newCard.id}
                                >
                                    <article className={styles.newCard}>
                                        <img
                                            className={styles.image}
                                            // src={newCard.imgSrc}
                                            src={'https://fastly.picsum.photos/id/459/600/400.jpg?hmac=n3Krd9fH0v3W0RCYNLw6IcI2A17urizqjxYLlv_Df3c'}
                                            alt={newCard.title}
                                            loading="lazy"
                                        />
                                        <div className={styles.info}>
                                            <h2 className={styles.titleCard}>
                                                {newCard.title}
                                            </h2>
                                            <div className={styles.categoryBadge}>
                                                {newCard.category}
                                            </div>
                                           
                                            <p className={styles.descriptionCard}>
                                                {newCard.description}
                                            </p>
                                            <div className={styles.metaInfo}>
                                                <span className={styles.dateText}>
                                                    {newCard.date}
                                                </span>
                                                <span className={styles.readMore}>
                                                    Read More
                                                </span>
                                            </div>
                                        </div>
                                    </article>
                                </a>
                            ))}
                        </div>
                        {news.length > newsPerPage && (
                            <Pagination
                                currentPage={currentPage}
                                pageNumbers={Math.ceil(news?.length / newsPerPage)}
                                setPage={setCurrentPage}
                                numberPerPage={newsPerPage}
                            />
                        )}
                    </div>
                )}
            </div>
        </>
    );
};

export async function getStaticProps() {
    const filePath = path.join(process.cwd(), 'src/data/mediaPage.json');
    const jsonData = fs.readFileSync(filePath, 'utf8');
    const data = JSON.parse(jsonData) || {};

    return {
        props: {
            ...data
        },
    };
}

export default ContactPage;