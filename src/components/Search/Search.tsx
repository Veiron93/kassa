import styles from "./Search.module.scss";

const Search = () => {
	return (
		<div className={styles.search}>
			<input type="text" placeholder="Поиск по коду, названию и др. " />
		</div>
	);
};

export default Search;
