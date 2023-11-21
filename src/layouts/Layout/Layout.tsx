import { Outlet } from "react-router-dom";
import { useEffect } from "react";
//import { Link } from "react-router-dom";

import styles from "./Layout.module.scss";

// services
import { getUser } from "@/services/users";

//store
import { useAppDispatch, useAppSelector } from "@/store/hooks/redux";
import { UsersSlice } from "@/store/reducers/UsersSlice";

// components
import StatusKassa from "@/components/StatusKassa/StatusKassa";
import Navigation from "@/components/Navigation/Navigation";
import User from "@/components/User/User";
import Logout from "@/components/Logout/Logout";

import Search from "@/components/Search/Search";
import Catalog from "@/components/Catalog/Catalog";

// import CodeProduct from "@/components/CodeProduct/CodeProduct";
// import SelectedProducts from "@/components/SelectedProducts/SelectedProducts";

function Layout() {
	// STORE
	const dispatch = useAppDispatch();

	// state
	//const { state: stateProductCode } = useAppSelector((state: any) => state.CodeProductReducer);

	// actions
	const { setUser } = UsersSlice.actions;
	// --

	useEffect(() => {
		const userAuth = localStorage.getItem("user");

		getUser(userAuth).then((response) => {
			dispatch(setUser(response));
		});
	});

	return (
		<main className={styles.layout}>
			<div className={styles.layoutContent}>
				<Outlet />
			</div>
			<div className={styles.layoutSide}>
				<div className={styles.layoutSideHeader}>
					<StatusKassa />
					<Navigation />
					<User />
					<Logout />
				</div>

				<Search />
				<Catalog />
				{/* <SelectedProducts /> */}
				{/* <CodeProduct /> */}
			</div>
		</main>
	);
}

export default Layout;
