import styles from "./CashRegisterAbout.module.scss";

const CashRegisterAbout = () => {
	let user = "Клюквина Анна";

	return (
		<div className={styles.cashRegisterAbout}>
			<div className={styles.cashRegisterName}>
				Карла Маркса 51. Касса 1 <br />
				<span>Оператор: {user}</span>
			</div>
		</div>
	);
};

export default CashRegisterAbout;
