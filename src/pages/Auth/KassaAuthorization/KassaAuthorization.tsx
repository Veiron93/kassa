import { useNavigate } from "react-router-dom";

import styles from "./kassaAuthorization.module.scss";

// services
import { kassaIsActive } from "@/services/kassa";
import { useEffect, useState } from "react";

const KassaAuthorization = () => {
	const navigation = useNavigate();

	const [tokenKassa, setTokenKassa] = useState<string>("");
	const [error, setError] = useState<string | null>(null);

	//useEffect(() => console.log(tokenKassa), [tokenKassa]);

	function validationTokenKassa() {
		setTokenKassa(tokenKassa.trim());

		if (tokenKassa.length === 0) {
			setError("Введите ключ кассы");
			return;
		}

		if (tokenKassa.length < 16 && tokenKassa.length) {
			setError("Введите корректный ключ кассы");
			return;
		}

		onLogInKassa();
	}

	function onLogInKassa() {
		kassaIsActive(tokenKassa).then((response: any) => {
			if (response) {
				const kassa = {
					token: tokenKassa,
				};

				localStorage.setItem("kassa", JSON.stringify(kassa));
				navigation("/auth/user");
			} else {
				setError("Ошибка");
			}
		});
	}

	return (
		<div className={styles.kassaAuthorization}>
			<div className={styles.kassaAuthorization_title}>Авторизация кассы</div>
			<span>123456765478fr33kt54</span>
			<div className={styles.kassaAuthorization_description}>Введите авторизационный ключ</div>
			<div className={styles.kassaAuthorization_form}>
				<input type="text" maxLength={16} value={tokenKassa} onChange={(e) => setTokenKassa(e.target.value)} />
				<button onClick={validationTokenKassa}>Ок</button>
			</div>

			{error && <div className="error">{error}</div>}
		</div>
	);
};

export default KassaAuthorization;
