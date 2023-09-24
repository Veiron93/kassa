import { Outlet } from "react-router-dom";

import styles from "./Layout.module.scss";

// components
//import SelectedProducts from "./../../components/SelectedProducts/SelectedProducts";
import OfflineModeIndication from "./../../components/OfflineModeIndication/OfflineModeIndication";
import Navigation from "./../../components/Navigation/Navigation";
import CodeProduct from "./../../components/CodeProduct/CodeProduct";

function Layout() {
	return (
		<main className={styles.layout}>
			<div className={styles.layoutContent}>
				<Outlet />
			</div>
			<div className={styles.layoutSide}>
				<OfflineModeIndication />
				<Navigation />
				<CodeProduct />
			</div>
		</main>
	);
}

export default Layout;
