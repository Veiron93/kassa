import { useNavigate } from "react-router-dom";

import styles from "./kassaAuthorization.module.scss";

// services
import { getKassa } from "@/services/kassa";
import { useState } from "react";

// hooks
//import { useSetLocalStorage } from "@/hooks/useSetLocalStorage";

// hooks
//import { useTest } from "@/hooks/useTest";

const KassaAuthorization = () => {
	const navigation = useNavigate();

	const [error, setError] = useState<string | null>(null);

	function validationTokenKassa() {
		onLogInKassa();
	}

	function onLogInKassa() {
		// тут проверяем токен кассы, если всё ок, то записываем в локал и неперенапрвляем на следующий шаг

		getKassa("fwefwefwewe").then((response) => {
			if (response) {
				localStorage.setItem("kassaToken", JSON.stringify(122121212));
				navigation("/auth/user");
			} else {
				setError("ошибка");
			}
		});
	}

	return (
		<div className={styles.kassaAuthorization}>
			<div className={styles.kassaAuthorization_title}>Авторизация кассы</div>
			<div className={styles.kassaAuthorization_description}>Введите авторизационный ключ</div>
			<div className={styles.kassaAuthorization_form}>
				<input type="text" maxLength={16} />
				<button onClick={validationTokenKassa}>Ок</button>
			</div>

			{error && <div className="error">{error}</div>}
		</div>
	);
};

export default KassaAuthorization;
