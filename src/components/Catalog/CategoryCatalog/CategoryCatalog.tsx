import styles from "./CategoryCatalog.module.scss";

const CategoryCatalog = (props: any) => {
	return <div className={`${styles.categoryCatalog} ${props.className ? props.className : ""}`}></div>;
};

export default CategoryCatalog;
