//services
import { kassaIsActive } from "@/services/kassa";
import { userIsActive } from "@/services/users";

export function isActive(type: string) {
	return new Promise((resolve) => {
		let data = localStorage.getItem(type);
		let onGetIsActive = null;

		if (data) {
			let dataJSON = JSON.parse(data);

			if (type === "kassa") onGetIsActive = kassaIsActive(dataJSON.token);
			if (type === "user") onGetIsActive = userIsActive(dataJSON);

			if (onGetIsActive) {
				onGetIsActive.then((response: any) => resolve(response));
			}
		} else {
			resolve(false);
		}
	});
}
