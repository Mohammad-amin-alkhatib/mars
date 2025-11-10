// Packages
import React, { useEffect, useState } from "react";
import path from "path";
import fs from "fs";
// Components
import InrtoHeader from "@/components/IntroHeader";
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
                <InrtoHeader header={header}/>
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
                    {...chooseUs}
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