import { useEffect, useState } from "react";

import styles from "./Settings.module.scss";

// db
import { db } from "@/db";

// data
import productsData from "@/data/products";

interface statusUpdateProductsDB {
	date: string;
	status: boolean;
}

const Settings = () => {
	const [statusUpdateDB, setStatusUpdateDB] = useState<statusUpdateProductsDB | null>(null);

	useEffect(() => {
		setStatusUpdateDB(getStatusUpdateProductsDB());
	}, []);

	async function updateProducts() {
		await db.products.clear();

		let statusUpdadeProducts = false;
		await db.products.bulkAdd(productsData.products).then(() => (statusUpdadeProducts = true));

		onStatusUpdateProductsDB(statusUpdadeProducts);
		setStatusUpdateDB(getStatusUpdateProductsDB());
	}

	function onStatusUpdateProductsDB(status: boolean) {
		let date = new Date();

		localStorage.setItem(
			"statusUpdateBD",
			JSON.stringify({
				date: `${date.getHours()}:${date.getMinutes()}, ${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`,
				status: status,
			})
		);
	}

	function getStatusUpdateProductsDB() {
		const statusUpdateBD: string | null = localStorage.getItem("statusUpdateBD");
		return statusUpdateBD ? JSON.parse(statusUpdateBD) : null;
	}

	// Режим работы кассы
	function onModeKassa() {
		let dataKassaLocalStorage = localStorage.getItem("kassa");

		if (dataKassaLocalStorage) {
			dataKassaLocalStorage = JSON.parse(dataKassaLocalStorage);
		}

		console.log(dataKassaLocalStorage);
	}

	return (
		<div className={styles.settings}>
			<div className="heading">Настройки</div>

			<div className={styles.updateProducts}>
				{statusUpdateDB && (
					<div className={styles.updateProductsStatus}>
						Последнее обновление: {statusUpdateDB.date}, {statusUpdateDB.status ? "Успешно" : "Ошибка"}
					</div>
				)}
				<button onClick={() => updateProducts()}>Обновить базу товаров</button>
			</div>

			<div className={styles.kassaMode}>
				<p>Режим работы кассы</p>
				<button onClick={() => onModeKassa()}>Онлайн</button>
			</div>
		</div>
	);
};

export default Settings;
