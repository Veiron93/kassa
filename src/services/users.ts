export function getUser(token: string) {
	return new Promise((resolve) => {
		resolve({
			isActive: true,
		});
	});
}

export function userLogIn(id: number) {
	const response = {
		data: true,
	};

	return response;
}
