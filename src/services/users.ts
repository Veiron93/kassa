import UsersData from "@/data/users";

export function userIsActive(token: string) {
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
