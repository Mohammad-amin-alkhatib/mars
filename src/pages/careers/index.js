import React, { useEffect, useState, useMemo } from "react";
import path from "path";
import fs from "fs";
// Components
import LetsWorkTogether from "@/components/LetsWorkTogether";
import MobileNavBar from "@/components/MobileNavBar";
import DesktopNavBar from "@/components/DesktopNavBar";
import Pagination from "@/components/Pagination";
// Styles
import styles from "./CareersPage.module.scss";

const CATEGORIES_PER_PAGE = 2;

const CareersPage = ({ header, jobs = [] }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

   const groupedJobs = useMemo(() => {
    const groups = {};
    jobs.forEach((job) => {
      const category = job.category || "Uncategorized";
      if (!groups[category]) {
        groups[category] = [];
      }
      groups[category].push(job);
    });
    return Object.entries(groups);
  }, [jobs]);

   const totalPages = Math.ceil(groupedJobs.length / CATEGORIES_PER_PAGE);
  const currentCategories = groupedJobs.slice(
    currentPage * CATEGORIES_PER_PAGE,
    (currentPage + 1) * CATEGORIES_PER_PAGE
  );

  useEffect(() => {
    const handleResize = () => {
      const isMobileDevice =
        /Android|iPhone|iPad/i.test(navigator.userAgent);
      setIsMobile(isMobileDevice || window.innerWidth <= 1440);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <div>
        {isMobile ? <MobileNavBar /> : <DesktopNavBar />}
        <LetsWorkTogether
          title={header?.title}
          description={header?.description}
        />

        {jobs.length > 0 && (
          <div className={styles.jobs}>
            <div className={styles.jobsContainer}>
              {currentCategories.map(([category, categoryJobs]) => (
                <section key={category} className={styles.categorySection}>
                  <h2 className={styles.categoryHeader}>{category}</h2>
                  <div className={styles.jobWrpaper}>
                   {categoryJobs.map((job, index) => (
                    <a
                      key={index}
                      // NEW – pass the whole job as a JSON string in the query
                      href={`/jobDescription?data=${encodeURIComponent(JSON.stringify(job))}`}
                      className={styles.jobCard}
                       rel={job.href ? "noopener noreferrer" : undefined}
                    >
                      <div>
                        <h3 className={styles.titleCard}>{job.title}</h3>
                        <p className={styles.descriptionCard}>{job.description}</p>
                      </div>
                      <div className={styles.cardFooter}>
                        <span className={styles.footerText}>{job.leftText || "Left Text"}</span>
                        <span className={styles.footerText}>{job.rightText || "Right Text"}</span>
                      </div>
                    </a>
                  ))}
                                    </div>
                </section>
              ))}

              {totalPages > 1 && (
                <Pagination
                  currentPage={currentPage}
                  pageNumbers={totalPages}
                  setPage={setCurrentPage}
                  numberPerPage={CATEGORIES_PER_PAGE}
                />
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export async function getStaticProps() {
  const filePath = path.join(
    process.cwd(),
    "src/data/careersPage.json"
  );
  const jsonData = fs.readFileSync(filePath, "utf8");
  const data = JSON.parse(jsonData) || {};

  return {
    props: {
      ...data,
    },
  };
}

export default CareersPage;