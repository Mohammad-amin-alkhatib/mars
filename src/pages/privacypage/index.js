import React from 'react';
import styles from "./privacypage.module.scss";  
import Footer from '@/components/Footer';  
import privacyData from '@/data/privacy-data.json';

const PrivacyPolicyPage = () => {
  return (
    <>
      <main className={styles.privacyPage}>
        {/* Header Section */}
        <div className={styles.headerSection}>
          <div className={styles.headerContent}>
            <h1 className={styles.headerTitle}>Privacy Policy</h1>
            <p className={styles.headerSubtitle}>We care about your privacy</p>
            <p className={styles.headerDescription}>
              Explore how Sirius can transform your workflow and elevate your team's collaboration.
            </p>
          </div>
        </div>

        {/* Content Section */}
        <div className={styles.container}>
          <div className={styles.content}>
            {privacyData.map((section, index) => (
              <section key={index} className={styles.section}>
                <h2 className={styles.sectionTitle}>{section.title}</h2>
                <p className={styles.sectionDescription}>{section.description}</p>
                {section.subDescription && (
                  <p className={styles.sectionSubDescription}>{section.subDescription}</p>
                )}
              </section>
            ))}
          </div>
        </div>
      </main>
     
    </>
  );
};

export default PrivacyPolicyPage;







