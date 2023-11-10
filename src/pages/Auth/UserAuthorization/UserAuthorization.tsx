import { redirect } from "react-router-dom";

import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import styles from "./userAuthorization.module.scss";

// data
import users from "@/data/users";

// hooks
//import { useSetLocalStorage } from "@/hooks/useSetLocalStorage";

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

	// const tokenKassa = localStorage.getItem("tokenKassa");

	// useEffect(() => {
	// 	if (!tokenKassa) {
	// 		navigation("/");
	// 	}
	// });

	const [stateForm, setStateForm] = useState<boolean>(false);
	const [selectedUserId, setSelectedUserId] = useState<null | number>(null);

	function onSelectUser(id: number) {
		setSelectedUserId(id);
		setStateForm(true);
	}

	function cancel() {
		setSelectedUserId(null);
		setStateForm(false);
	}

	function onUserAuth() {
		if (selectedUserId) {
			// 0
			const result = userLogIn(selectedUserId);

			// 1
			localStorage.setItem("userIdKassa", JSON.stringify(selectedUserId));

			// 2
			//dispatch(setUserStore(selectedUserId, "121212122112"));

			// 3
			navigation("/");
		}
	}

	return (
		<div className={styles.userAuthorization}>
			<div className={styles.userAuthorization_title}>Выберите пользователя</div>

			<div className={styles.userAuthorization_usersList}>
				{users.map((user) => (
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
						<input type="text" maxLength={4} />
					</label>

					<div className={styles.btns}>
						<Button onClick={onUserAuth}>ОК</Button>
						<Button onClick={cancel}>Отмена</Button>
					</div>
				</div>
			)}
		</div>
	);
};

export default UserAuthorization;
