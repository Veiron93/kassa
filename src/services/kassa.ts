export function getKassa(token: string) {
	return new Promise((resolve) => {
		resolve({
			isActive: true,
		});
	});
}
