import styles from "./Index.module.scss";

// components
import ProductsList from "../../components/ProductsList/List/List";
import OrderInfo from "../../components/OrderInfo/OrderInfo";
//import SelectedProducts from "./../../components/SelectedProducts/SelectedProducts";

//import CashRegisterAbout from "./../../components/CashRegisterAbout/CashRegisterAbout";

const Index = () => {
	return (
		<div className={styles.indexPage}>
			<ProductsList />
			<OrderInfo />
		</div>
	);
};

export default Index;
