import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import styles from "./userAuthorization.module.scss";

// services
import { userLogIn, getUsers } from "@/services/users";

// models
import { User } from "@/models/users";

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
	const { setUsers: setUsersStore, setActiveUserId: setActiveUserIdStore } = UsersSlice.actions;
	// --

	// ROUTER
	const navigation = useNavigate();
	// --

	const [stateForm, setStateForm] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);

	const [users, setUsers] = useState<Array<User>>([]);
	const [selectedUserId, setSelectedUserId] = useState<string>("");
	const [password, setPassword] = useState<string>("");

	// удалить
	const mode = 1;
	//--

	useEffect(() => {
		const kassa: any = JSON.parse(localStorage.getItem("kassa") ?? "null");

		if (kassa.token) {
			// онлайн режим
			if (mode) {
				getUsers(kassa.token).then((response: any) => {
					let users: any = [];

					// вот тут нужно шифровать пин код пользователя
					if (response && response.data) {
						users = [...response.data];
						setUsers(users);
					}

					localStorage.setItem("users", JSON.stringify(users));
				});
			}

			// оффлайн режим
			if (!mode) {
				const users: any = JSON.parse(localStorage.getItem("users") ?? "[]");

				setUsers(users);
				localStorage.setItem("users", JSON.stringify(users));
			}
		}
	}, []);

	// выбор пользователя
	function onSelectUser(id: string) {
		setSelectedUserId(id);
		setStateForm(true);
		reset();
	}

	// скрыть форму ввода пароля
	function cancel() {
		setSelectedUserId("");
		setStateForm(false);
		reset();
	}

	// сброс формы ввода пароля
	function reset() {
		setPassword("");
		setError(null);
	}

	// валидация пароля
	function validationUserAuth() {
		setPassword(password.trim());

		if (!selectedUserId) {
			setError("Выберите пользователя");
			return;
		}

		if (password.length === 0) {
			setError("Введите код");
			return;
		}

		if (password.length > 0 && password.length < 4) {
			setError("Введите корректный код");
			return;
		}

		onUserAuth();
	}

	// авторизация пользователя
	function onUserAuth() {
		const user: any = userLogIn(selectedUserId, password);

		if (user) {
			localStorage.setItem("user", selectedUserId);
			navigation("/");
		} else {
			setError("Введен неверный код");
		}
	}

	return (
		<div className={styles.userAuthorization}>
			<div className={styles.userAuthorization_title}>Выберите пользователя</div>

			{users && users.length > 0 && (
				<div className={styles.userAuthorization_usersList}>
					{users.map((user) => (
						<div
							className={`${styles.user} ${selectedUserId === user.id ? styles.active : ""}`}
							key={user.id}
							onClick={() => onSelectUser(user.id)}
						>
							{user.last_name + " " + user.first_name + " " + user.middle_name}
						</div>
					))}
				</div>
			)}

			{stateForm && (
				<div className={styles.userAuthorization_form}>
					<label>
						<span>Введите код</span>
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
