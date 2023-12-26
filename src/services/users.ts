import axios from "axios";

// возвращает id пользователя если залогинен, иначе null
export function onUserIsLogIn(): number | null {
	return JSON.parse(localStorage.getItem("user") ?? "null");
}

// авторизация пользователя
export function userLogIn(id: string, password: string) {
	const usersDataLocalStorage = localStorage.getItem("users");
	const users = usersDataLocalStorage ? JSON.parse(usersDataLocalStorage) : [];

	if (!users) {
		return false;
	}

	return users.find((user: any) => user.id === id && user.password === password);
}

// возвращает список пользователей, привязанных к кассе
export function getUsers(tokenKassa: string) {
	return axios.get(process.env.REACT_APP_SERVER_LINK + "api/kassas/personal/", {
		headers: {
			"kassa-token": tokenKassa,
		},
	});
}
