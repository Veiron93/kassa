import { Outlet } from "react-router-dom";
import { useEffect } from "react";

import styles from "./Layout.module.scss";

// services
import { getUser } from "@/services/users";
import { getProductsCatalog, getCategoriesCatalog, getFavoritesCatalog, setItemsCatalogDB } from "@/services/catalog";

//store
import { useAppDispatch, useAppSelector } from "@/store/hooks/redux";
import { UsersSlice } from "@/store/reducers/UsersSlice";
import { CatalogSlice } from "@/store/reducers/CatalogSlice";

// components
import StatusKassa from "@/components/StatusKassa/StatusKassa";
import Navigation from "@/components/Navigation/Navigation";
import User from "@/components/User/User";
import Logout from "@/components/Logout/Logout";

import Search from "@/components/Search/Search";
import Catalog from "@/components/Catalog/Catalog";

function Layout() {
	// STORE
	const dispatch = useAppDispatch();

	// state
	//const { state: stateProductCode } = useAppSelector((state: any) => state.CodeProductReducer);

	// actions
	const { setUser } = UsersSlice.actions;
	const { setProducts: setProductsStore, setCategories: setCategoriesStore, setFavorites: setFavoritesStore } = CatalogSlice.actions;
	// --

	// ПОЛЬЗОВАТЕЛЬ
	useEffect(() => {
		const userAuth = localStorage.getItem("user");

		getUser(userAuth).then((response) => {
			dispatch(setUser(response));
		});
	});

	// ЗАГРУЗКА КАТАЛОГА
	useEffect(() => {
		// товары
		getProductsCatalog().then((response) => {
			//setItemsCatalogDB(response, "products"); // db
			dispatch(setProductsStore(response)); // store
		});

		// категории
		getCategoriesCatalog().then((response) => {
			//setItemsCatalogDB(response, "categories"); // db
			dispatch(setCategoriesStore(response)); // store
		});

		// избранное
		getFavoritesCatalog().then((response) => {
			//setItemsCatalogDB(response, "favorites"); // db
			dispatch(setFavoritesStore(response)); // store
		});

		// setInterval(() => {
		// 	checkCatalog();
		// }, 1000 * 60);
	}, []);

	function checkCatalog() {}

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
			</div>
		</main>
	);
}

export default Layout;
