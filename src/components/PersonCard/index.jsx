// Styles
import styles from './PersonCard.module.scss';
// Icons
import LinkedIn from '@/assets/icons/dark-linkedIn.svg';

const PersonCard = ({ imgSrc, name, jobTitle, href }) => {
    const sanitizedHref = href?.startsWith('http') ? href : `https://${href}`;

    return (
        <div className={styles.container}>
            <img
                className={styles.image}
                src={imgSrc}
                alt={`${name}'s profile`}
            />
            <div className={styles.personInfo}>
                <span className={styles.personName}>{name}</span>
                <div className={styles.personJob}>{jobTitle}</div>
            </div>
            {href && (
                <a
                    className={styles.linkedinIcon}
                    href={sanitizedHref}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <LinkedIn />
                </a>
            )}
        </div>
    );
};

export default PersonCard;
