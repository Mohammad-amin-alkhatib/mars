// Package
import React from "react";
import path from "path";
import fs from "fs";
// Components
import Head from "next/head";
import LetsWorkTogether from "@/components/LetsWorkTogether";
import MobileNavBar from "@/components/MobileNavBar";
import DesktopNavBar from "@/components/DesktopNavBar";
import Pagination from "@/components/Pagination";
// Styles
import styles from "./CareersPage.module.scss";

const CareersPage = ({ header, jobs = [] }) => {
    const [currentPage, setCurrentPage] = React.useState(0);
    const jobsPerPage = 6;
    const currentNews = jobs?.slice(currentPage * jobsPerPage, (currentPage * jobsPerPage) + jobsPerPage);

    return (
        <>
            <div>
                <DesktopNavBar />
                <MobileNavBar />
                <LetsWorkTogether
                    title={header?.title}
                    description={header?.description}
                />
                {jobs && <div className={styles.jobs}>
                    <div className={styles.jobsContainer}>
                        <div className={styles.jobWrpaper}>
                            {
                                currentNews?.map((jobCard, index) => (
                                    <a
                                        className={styles.jobCard}
                                        href={jobCard.href}
                                        key={index}
                                        rel="noopener noreferrer"
                                        target="_blank"
                                    >
                                        <h2 className={styles.titleCard}>{jobCard.title}</h2>
                                        <p className={styles.descriptionCard}>{jobCard.description}</p>
                                    </a>
                                ))
                            }
                        </div>
                        {jobs.length > jobsPerPage && (
                            <Pagination
                                currentPage={currentPage}
                                pageNumbers={Math.ceil(jobs?.length / jobsPerPage)}
                                setPage={setCurrentPage}
                                numberPerPage={jobsPerPage}
                            />
                        )}
                    </div>
                </div>}
            </div>
        </>
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