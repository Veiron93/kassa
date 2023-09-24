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
		{ name: "Главная", to: "/", classStyle: "navItemIndex" },
		{ name: "Товары", to: "products", classStyle: "navItemProducts" },

		// { id: 1, name: "Возврат", link: "return", classStyle: "navItemReturnProduct" },
		// { name: "О товаре", event: null, classStyle: "navItemAboutProduct", icon: null },
		// { name: "История", event: null, classStyle: "navItemHistory", icon: null },
		// { name: "Настройки", event: null, classStyle: "navItemSettings", icon: null },
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
