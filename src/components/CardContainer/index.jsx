import Card from "../Card";
import styles from "./CardContainer.module.scss";
import cx from "classnames";

const CardContainer = ({ cards, className }) => {
    return (
        <div className={cx(styles.container, className)}>
            {cards.map((card, index) => (
                <Card key={index} {...card} />
            ))}
        </div>
    );
};

export default CardContainer;
