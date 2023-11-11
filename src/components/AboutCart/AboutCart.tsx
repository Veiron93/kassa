import { useNavigate } from "react-router-dom";

import styles from "./AboutCart.module.scss";

// components
import StatusCart from "@/components/AboutCart/StatusCart/StatusCart";

// images
import Icons from "@/ui-components/Icons/Icons";

const AboutCart = () => {
	const navigate = useNavigate();

	let user = "Клюквина Анна";

	function logOut() {
		localStorage.removeItem("userToken");
		navigate("/auth/user");
	}

	return (
		<div className={styles.aboutCart}>
			<div className={styles.sectionInfo}>
				<StatusCart />
				<div className={styles.user}>{user}</div>
			</div>

			<div className={styles.logOut} onClick={logOut}>
				<img src={Icons.logoutWhite} />
			</div>
		</div>
	);
};

export default AboutCart;
