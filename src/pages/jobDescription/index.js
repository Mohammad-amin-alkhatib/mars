 import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import MobileNavBar from "@/components/MobileNavBar";
import DesktopNavBar from "@/components/DesktopNavBar";
import styles from "./JobDescription.module.scss";

const JobDescription = () => {
  const router = useRouter();
  const [job, setJob] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  // Read job from URL
  useEffect(() => {
    if (router.isReady && router.query.data) {
      try {
        const decoded = JSON.parse(decodeURIComponent(router.query.data));
        setJob(decoded);
      } catch (e) {
        console.error("Failed to parse job data", e);
      }
    }
  }, [router.isReady, router.query.data]);

   useEffect(() => {
    const check = () => {
      const mobile =
        /Android|iPhone|iPad/i.test(navigator.userAgent) ||
        window.innerWidth <= 1440;
      setIsMobile(mobile);
    };
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  if (!job) {
    return (
      <>
        {isMobile ? <MobileNavBar /> : <DesktopNavBar />}
        <div className={styles.loading}>Loading job details…</div>
      </>
    );
  }

  return (
    <>
      { }
      {isMobile ? <MobileNavBar /> : <DesktopNavBar />}

      { }
      <div className={styles.jobsContainer}>
        <div className={styles.innerGrid}>

          {}
           <div className={styles.left}>
  <div> { }
    <h1 className={styles.pageTitle}>{job.title}</h1>
    <p className={styles.shortText}>{job.shortText}</p>

    <div className={styles.tagRow}>
      <div className={styles.tag}>Irbid</div>
      <div className={styles.tag}>{job.rightText}</div>
      <div className={styles.tag}>{job.leftText}</div>
    </div>

    <button className={styles.applyButton}>
      Apply for this role
    </button>
  </div>
</div>

          {/* RIGHT */}
          <div className={styles.right}>
            {job.aboutThisRole && (
              <div className={styles.section}>
                <h2 className={styles.sectionTitle}>About This Role</h2>
                <p className={styles.sectionText}>{job.aboutThisRole}</p>
              </div>
            )}

            {job.whatYouWillDo && (
              <div className={styles.section}>
                <h2 className={styles.sectionTitle}>What You’ll Do</h2>
                <ul className={styles.bulletList}>
                  {job.whatYouWillDo.map((item, i) => (
                    <li key={i} className={styles.bulletItem}>{item}</li>
                  ))}
                </ul>
              </div>
            )}

            {job.techStack && (
              <div className={styles.section}>
                <h2 className={styles.sectionTitle}>Tech</h2>
                <ul className={styles.bulletList}>
                  {job.techStack.map((tech, i) => (
                    <li key={i} className={styles.bulletItem}>{tech}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

        </div>
      </div>

      {}
    </>
  );
};

export default JobDescription;