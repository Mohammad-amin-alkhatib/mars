import cx from 'classnames';
import styles from './Pagination.module.scss';

const Pagination = ({ className, currentPage, pageNumbers, setPage }) => {
    const handlePrevious = () => {
        if (currentPage > 0) {
            setPage(currentPage - 1);
        }
    };

    const handleNext = () => {
        if (currentPage < pageNumbers - 1) {
            setPage(currentPage + 1);
        }
    };

    return (
        <div className={cx(styles.pagination, className)}>
            <button className={cx(styles.previous, styles.button)} onClick={handlePrevious} disabled={currentPage === 0}>
                {'<'}
            </button>
            <div className={styles.pageNumbers}>
                {Array(pageNumbers).fill(0).map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setPage(index)}
                        className={cx(styles.pageNumber, {
                            [styles.active]: currentPage === index,
                        }, styles.button)}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
            <button
                className={cx(styles.next, styles.button)}
                onClick={handleNext}
                disabled={currentPage === pageNumbers - 1}
            >
                {'>'}
            </button>
        </div>
    );
};

export default Pagination;
