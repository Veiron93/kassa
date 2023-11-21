import { useNavigate } from "react-router-dom";

import styles from "./Logout.module.scss";

// images
import Icons from "@/ui-components/Icons/Icons";

const Logout = () => {
	const navigate = useNavigate();

	function logOut() {
		localStorage.removeItem("user");
		navigate("/auth/user");
	}

	return (
		<div className={styles.logout} onClick={logOut}>
			<img src={Icons.logoutWhite} />
		</div>
	);
};

export default Logout;
