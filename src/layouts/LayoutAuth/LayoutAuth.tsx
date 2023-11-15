import { Outlet } from "react-router-dom";

import styles from "./layoutAuth.module.scss";

function Layout() {
	return (
		<main className={styles.layoutAuth}>
			<Outlet />
		</main>
	);
}

export default Layout;
