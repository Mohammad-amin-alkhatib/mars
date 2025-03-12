import path from 'path';
import fs from 'fs';
import CardContainer from '@/components/CardContainer';
import styles from '@/styles/pages/products.module.scss';

const ProductsPage = ({ categories }) => {

    return (
        <div>
            {/* Header */}
            <CardContainer className={styles.cards} cards={categories} />
            {/* Lets work Together */}
        </div>
    )
};

export const getServerSideProps = async () => {
    const filePath = path.join(process.cwd(), 'src/data/categories.json');
    const jsonData = fs.readFileSync(filePath, 'utf8');
    const categories = JSON.parse(jsonData);

    return {
        props: {
            categories,
        }
    };
};

export default ProductsPage;
