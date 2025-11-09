// Packages
import React, { useEffect, useState } from "react";
import path from "path";
import fs from "fs";
// Components
import DesktopNavBar from "@/components/DesktopNavBar";
import MobileNavBar from "@/components/MobileNavBar";
import Head from "next/head";
// Styles
import styles from "./Contact.module.scss";
import LetsWorkTogether from "@/components/LetsWorkTogether";
import Form from "@/components/Form";
import InrtoHeader from "@/components/IntroHeader";

const ContactPage = ({ header, getIntouch }) => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            console.log(navigator.userAgent, "isMobile: ", window.innerWidth <= 768);

            if (navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i)) {
                setIsMobile(true);
                return;
            }

            setIsMobile(window.innerWidth <= 1440);
        };

        handleResize();

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    const socialLinks = [
        { name: 'LinkedIn', url: 'https://www.linkedin.com/company/marsrobotics', icon: 'linkedin' },
        { name: 'Facebook', url: 'https://www.facebook.com/marsrobotics', icon: 'facebook' },
        { name: 'X (Twitter)', url: 'https://twitter.com/marsrobotics', icon: 'x' }
    ];

    const companyLogos = [
        { name: 'Company 1', logo: '/images/partners/company1.png' },
        { name: 'Company 2', logo: '/images/partners/company2.png' },
        { name: 'Company 3', logo: '/images/partners/company3.png' },
        { name: 'Company 4', logo: '/images/partners/company4.png' },
        { name: 'Company 5', logo: '/images/partners/company5.png' },
    ];

    return <>
        <div>
            <InrtoHeader
                    header={header}
                />
            <LetsWorkTogether
                title={getIntouch?.title}
                description={getIntouch?.description}
                imgSrc={getIntouch?.imgSrc}
            />
            <div className={styles.contactUs}>
                <div className={styles.infoContainer}>
                    <div className={styles.mapSection}>
                        {/* Social Media Links Above Map */}
                        <div className={styles.socialMedia}>
                            <h3>Follow Us</h3>
                            <div className={styles.socialIcons}>
                                {socialLinks.map((social, index) => (
                                    <a 
                                        key={index}
                                        href={social.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={styles.socialIcon}
                                        aria-label={social.name}
                                    >
                                        {social.icon === 'linkedin' && (
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                                <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z"/>
                                            </svg>
                                        )}
                                        {social.icon === 'facebook' && (
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                                            </svg>
                                        )}
                                        {social.icon === 'x' && (
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                                            </svg>
                                        )}
                                    </a>
                                ))}
                            </div>
                        </div>

                        {/* Map */}
                        <div className={styles.location}>
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d17691.23926105935!2d35.88355437238305!3d32.53950057680667!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x151c76f0573efd0b%3A0xa49ded1f5dbe5871!2sMARSRobotics!5e0!3m2!1sar!2sjo!4v1744405256436!5m2!1sar!2sjo"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                title="MARS Robotics Location"
                            />
                        </div>

                        {/* Company Logos Below Map */}
                        <div className={styles.partners}>
                            <h3>Our Partners</h3>
                            <div className={styles.partnerLogos}>
                                {companyLogos.map((company, index) => (
                                    <div key={index} className={styles.partnerLogo}>
                                        <img src={company.logo} alt={company.name} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className={styles.info}>
                        <p>info@marsrobotic.com</p>
                        <p>+962 27102026</p>
                        <p>+962 27102044</p>
                        <p>Wasfi Al Tal Street, P.O Box 2233, Irbid 21163, Jordan</p>
                    </div>
                </div>
                <Form className={styles.form} />
            </div>
        </div>
    </>
}


export async function getStaticProps() {
    const filePath = path.join(process.cwd(), 'src/data/contactPage.json');
    const jsonData = fs.readFileSync(filePath, 'utf8');
    const data = JSON.parse(jsonData) || {};

    return {
        props: {
            ...data
        },
    };
}

export default ContactPage;