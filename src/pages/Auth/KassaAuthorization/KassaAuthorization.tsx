import { useNavigate } from "react-router-dom";
import axios from "axios";

import styles from "./kassaAuthorization.module.scss";

// services
//import { kassaIsActive } from "@/services/kassa";
import { useEffect, useState } from "react";

const KassaAuthorization = () => {
	const navigation = useNavigate();

	const [tokenKassa, setTokenKassa] = useState<string>("");
	const [error, setError] = useState<string | null>(null);

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
		axios
			.post(process.env.REACT_APP_SERVER_LINK + "api/kassas/link", {
				device_key: tokenKassa,
			})
			.then((response) => {
				const kassa = {
					name: response.data.name,
					token: response.data.device_token,
					mode: "online",
				};

				localStorage.setItem("kassa", JSON.stringify(kassa));
				navigation("/auth/user");
			});

		//device_key: "QRPR1RXFEXMCLT0O";
	}

	return (
		<div className={styles.kassaAuthorization}>
			<div className={styles.kassaAuthorization_title}>Авторизация кассы</div>
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
