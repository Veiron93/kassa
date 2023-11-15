import UsersData from "@/data/users";

export function userIsActive(data: any) {
	// отправляем токен пользователя и токен кассы
	return new Promise((resolve) => {
		resolve(true);
	});
}

export function userLogIn(id: string, password: string) {
	return new Promise((resolve) => {
		resolve(UsersData.user);
	});
}

export function getUser(userAuth: any) {
	return new Promise((resolve) => {
		resolve(UsersData.user);
	});
}

export function getUsers(tokenKassa: string) {
	return new Promise((resolve) => {
		resolve(UsersData.users);
	});
}
