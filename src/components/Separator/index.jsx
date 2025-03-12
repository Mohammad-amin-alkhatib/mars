import cx from 'classnames';
import styles from './Separator.module.scss';

const Separator = ({ className }) => {
    return <div className={cx(styles.container, className)} />
}

export default Separator