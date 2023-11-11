import { Outlet } from "react-router-dom";

import styles from "./layoutAuth.module.scss";

// components
//import SelectedProducts from "./../../components/SelectedProducts/SelectedProducts";

function Layout() {
	return (
		<main className={styles.layoutAuth}>
			<Outlet />
		</main>
	);
}

export default Layout;
