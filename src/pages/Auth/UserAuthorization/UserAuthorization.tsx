import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import styles from "./userAuthorization.module.scss";

// data
import usersData from "@/data/users";

// services
import { userLogIn } from "@/services/users";

// store
import { useAppSelector, useAppDispatch } from "@/store/hooks/redux";
import { UsersSlice } from "@/store/reducers/UsersSlice";

// ui-components
import Button from "@/ui-components/Button/Button";

const UserAuthorization = () => {
	// STORE
	const dispatch = useAppDispatch();

	// state
	//const { products } = useAppSelector((state: any) => state.UsersReducer);

	// actions
	const { setUser: setUserStore } = UsersSlice.actions;

	// --

	// ROUTER
	const navigation = useNavigate();

	// --

	const [stateForm, setStateForm] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);

	const [selectedUserId, setSelectedUserId] = useState<string>("");
	const [password, setPassword] = useState<string>("");

	function onSelectUser(id: string) {
		setSelectedUserId(id);
		setStateForm(true);
	}

	function cancel() {
		setSelectedUserId("");
		setStateForm(false);
	}

	function validationUserAuth() {
		setPassword(password.trim());

		if (!selectedUserId) {
			setError("Выберите пользователя");
			return;
		}

		if (password.length === 0) {
			setError("Введите ПИН-код");
			return;
		}

		if (password.length > 0 && password.length < 4) {
			setError("Введите корректный ПИН-код");
			return;
		}

		onUserAuth();
	}

	function onUserAuth() {
		// 0
		userLogIn(selectedUserId, password).then((response: any) => {
			if (response) {
				const user = {
					id: response.id,
					token: response.token,
				};

				localStorage.setItem("user", JSON.stringify(user));
				navigation("/");
			} else {
				setError("Ошибка");
			}
		});
	}

	return (
		<div className={styles.userAuthorization}>
			<div className={styles.userAuthorization_title}>Выберите пользователя</div>

			<div className={styles.userAuthorization_usersList}>
				{usersData.users.map((user) => (
					<div
						className={`${styles.user} ${selectedUserId === user.id ? styles.active : ""}`}
						key={user.id}
						onClick={() => onSelectUser(user.id)}
					>
						{user.name}
					</div>
				))}
			</div>

			{stateForm && (
				<div className={styles.userAuthorization_form}>
					<label>
						<span>Введите ПИН-код</span>
						<input type="password" maxLength={4} value={password} onChange={(e) => setPassword(e.target.value)} />
					</label>

					<div className={styles.btns}>
						<Button onClick={validationUserAuth}>ОК</Button>
						<Button onClick={cancel}>Отмена</Button>
					</div>
				</div>
			)}

			{error && <div className="error">{error}</div>}
		</div>
	);
};

export default UserAuthorization;
