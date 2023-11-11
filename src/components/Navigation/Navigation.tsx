import { Link } from "react-router-dom";

import styles from "./Navigation.module.scss";

const Navigation = () => {
	interface navItem {
		name: string;
		to: string;
		event?: null | string;
		classStyle?: string | null;
		icon?: string | null;
		onPress?: any;
	}

	const navItems: navItem[] = [
		{ name: "Продажа", to: "/", classStyle: "navItemIndex" },
		{ name: "Товары", to: "products", classStyle: "navItemProducts" },
		{ name: "Возврат", to: "return-product", classStyle: "navItemAboutReturnProduct" },
		{ name: "История", to: "history", classStyle: "navItemHistory" },
		{ name: "О товаре", to: "about-product", classStyle: "navItemAboutProduct" },
		{ name: "Настройки", to: "settings", classStyle: "navItemSettings" },
	];

	return (
		<div className={styles.navigation}>
			{navItems.map((navItem, index) => (
				<Link key={index} to={navItem.to} className={`${styles.navigationItem} ${navItem.classStyle ? styles[navItem.classStyle] : null}`}>
					{navItem.icon != null && <img src={navItem.icon} alt={navItem.name} />}
					<span>{navItem.name}</span>
				</Link>
			))}
		</div>
	);
};

export default Navigation;
