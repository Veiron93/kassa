import axios from "axios";

export function kassaIsActive(token: string) {
	return axios.get(process.env.REACT_APP_SERVER_LINK + "api/kassas/check/", {
		headers: {
			"kassa-token": token,
		},
	});
}
