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
                <Form className={styles.form} />
                <div className={styles.infoContainer}>
                    <div className={styles.location}>
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d17691.23926105935!2d35.88355437238305!3d32.53950057680667!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x151c76f0573efd0b%3A0xa49ded1f5dbe5871!2sMARSRobotics!5e0!3m2!1sar!2sjo!4v1744405256436!5m2!1sar!2sjo"
                            width="100%"
                            height="100%"
                            frameborder="0"
                            allowfullscreen="true"
                            loading="lazy"
                            referrerpolicy="no-referrer-when-downgrade"
                        ></iframe>

                    </div>
                    <div className={styles.info}>
                        <p>Email: info@marsrobotic.com</p>
                        <p>Phone: +962 27102026</p>
                        <p>Fax: +962 27102044</p>
                        <p>Address: Wasfi Al Tal Street, P.O Box 2233, Irbid 21163, Jordan</p>
                    </div>
                </div>
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