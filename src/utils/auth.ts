//services
import { getKassa } from "@/services/kassa";
import { getUser } from "@/services/users";

export function isActive(type: string) {
	return new Promise((resolve) => {
		let token = localStorage.getItem(type + "Token");
		let onGetIsActive = null;

		if (token) {
			if (type === "kassa") onGetIsActive = getKassa(token);
			if (type === "user") onGetIsActive = getUser(token);

			if (onGetIsActive) {
				onGetIsActive.then((response: any) => resolve(response.isActive));
			}
		} else {
			resolve(false);
		}
	});
}
