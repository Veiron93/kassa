//services
import { kassaIsActive } from "@/services/kassa";

export async function isActiveKassa() {
	let data = JSON.parse(localStorage.getItem("kassa") ?? "null");
	let state: boolean | null = null;

	if (data) {
		await kassaIsActive(data.token)
			.then((response) => {
				state = true;
				//console.log(response);
			})
			.catch((error) => {
				// недействительный токен
				if (error.response.data.error.code === 101) {
					state = false;
				}
			});
	} else {
		state = false;
	}

	return state;
}
