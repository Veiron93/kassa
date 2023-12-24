import { Outlet } from "react-router-dom";

import styles from "./layoutAuth.module.scss";

// hooks
import { useMode } from "@/hooks/useMode";

function Layout() {
	// Режим
	useMode();
	//--

	return (
		<main className={styles.layoutAuth}>
			<Outlet />
		</main>
	);
}

export default Layout;
