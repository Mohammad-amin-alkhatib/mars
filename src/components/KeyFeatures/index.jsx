// Package
import dynamic from 'next/dynamic';
// Components
import LetsWorkTogether from '../LetsWorkTogether';
// Styles
import styles from './KeyFeatures.module.scss';
// Data
import feutureMap from "@/data/keyFeatures.json";

const KeyFeatures = ({ keyFeaturesKeys }) => {
    return (
        <div className={styles.contaier}>
            <LetsWorkTogether
                title={`Key Features`}
                className={styles.keyFeaturesTitle}
            />
            <div className={styles.keysContainer}>
                {keyFeaturesKeys.map((key, index) => {
                    const { icon, title } = feutureMap[key];
                    const Icon = dynamic(() => import(`../../assets/keyFuetures/${icon}`), {
                        ssr: false,
                    });

                    return (
                        <div key={index} className={styles.keyFeature}>
                            <div className={styles.iconContainer}>
                                <Icon className={styles.icon} />
                            </div>
                            <div className={styles.keyFeatureTitle}>
                                {title}
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    );
}

export default KeyFeatures;