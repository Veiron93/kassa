import styles from "./Index.module.scss";

import Cart from "@/components/Cart/Cart/Cart";

const Index = () => {
	return (
		<div className={styles.indexPage}>
			<Cart />
		</div>
	);
};

export default Index;
