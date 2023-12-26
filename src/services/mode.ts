import axios from "axios";

export function modeCheck() {
	return axios.get(String(process.env.REACT_APP_SERVER_LINK));
}
