import ArrowButton from '../ArrowButton';
import Separator from '../Separator';
import styles from './LetsWorkTogether.module.scss';
import WorkTogether from '@/assets/icons/work-together.svg';
import cx from 'classnames';

const LetsWorkTogether = ({ hasTransperantBackground, className }) => {
    return (
        <div className={cx(styles.container, {
            [styles.transperatBackground]: hasTransperantBackground
        }, className)}>
            <div className={styles.textPart}>
                <h2 className={styles.title}>Let's work together</h2>
                <Separator className={styles.separator} />
                <p className={styles.description}>Ready to take the next step? Contact us today to discuss your needs and explore how our expertise can drive your success.</p>
                <ArrowButton text="Contact Us" href={'/contact'} />
            </div>
            <div className={styles.icon}>
                <WorkTogether />
            </div>
        </div>
    );
}

export default LetsWorkTogether;
