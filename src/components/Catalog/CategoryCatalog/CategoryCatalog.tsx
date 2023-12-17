import styles from "./CategoryCatalog.module.scss";

// models
import { Category } from "@/models/catalog";

interface propsCategoryCatalog {
	category: Category;
	className?: any;
	onClick?: any;
}

const CategoryCatalog = (props: propsCategoryCatalog) => {
	function handlerClick(product: Category) {
		props.onClick(product);
	}

	return (
		<div className={`${styles.categoryCatalog} ${props.className ? props.className : ""}`} onClick={() => handlerClick(props.category)}>
			<div className={styles.categoryCatalogName}>{props.category.name}</div>
		</div>
	);
};

export default CategoryCatalog;
