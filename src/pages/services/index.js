// Packages
import React, { useEffect, useState } from "react";
import path from "path";
import fs from "fs";
// Components
import Head from "next/head";
import DesktopNavBar from "@/components/DesktopNavBar";
import MobileNavBar from "@/components/MobileNavBar";
import LetsWorkTogether from "@/components/LetsWorkTogether";
import Card from "@/components/Card"
// Styles
import styles from "./Services.module.scss";

const ContactPage = ({ header, services, chooseUs }) => {
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

    return (
        <>
            <div>
                {isMobile ? <MobileNavBar /> : <DesktopNavBar />}
                <LetsWorkTogether
                    title={header?.title}
                    description={header?.description}
                />
                <div className={styles.servicesSection}>
                    <div className={styles.containerServices}>
                        {services?.cards.map((card, index) => (
                            <Card
                                key={index}
                                description={card.description}
                                title={card.title}
                                image={card.image}
                                href={card.href}
                            />
                        ))}
                    </div>
                    {!!services?.description && <p className={styles.serviceDescription}> {services.description}</p>}
                </div>
                <LetsWorkTogether
                    className={styles.whyChooseSection}
                    title={chooseUs?.title}
                    imgSrc={chooseUs?.imgSrc}
                    description={chooseUs?.description}
                />
            </div>
        </>
    )
}


export async function getStaticProps() {
    const filePath = path.join(process.cwd(), 'src/data/servicesPage.json');
    const jsonData = fs.readFileSync(filePath, 'utf8');
    const data = JSON.parse(jsonData) || {};

    return {
        props: {
            ...data
        },
    };
}

export default ContactPage;