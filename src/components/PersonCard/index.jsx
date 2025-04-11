// Styles
import styles from './PersonCard.module.scss';
// Icons
import LinkedIn from '@/assets/icons/dark-linkedIn.svg';

const PersonCard = ({ imgSrc, name, jobTitle }) => {
    return (
        <div className={styles.container}>
            <img className={styles.image} src={imgSrc} />
            <div className={styles.personInfo}>
                <span className={styles.personName}>{name}</span>
                <div className={styles.personJob}>{jobTitle}</div>
            </div>
            <a className={styles.linkedinIcon}>
                <LinkedIn />
            </a>
        </div>
    );
}

export default PersonCard;
