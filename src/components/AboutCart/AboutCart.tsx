import { useNavigate } from "react-router-dom";

import styles from "./AboutCart.module.scss";

//store
import { useAppSelector } from "@/store/hooks/redux";

// components
import StatusCart from "@/components/AboutCart/StatusCart/StatusCart";

// images
import Icons from "@/ui-components/Icons/Icons";

const AboutCart = () => {
	const navigate = useNavigate();

	// state
	const { user } = useAppSelector((state: any) => state.UsersReducer);

	function logOut() {
		localStorage.removeItem("user");
		navigate("/auth/user");
	}

	return (
		<div className={styles.aboutCart}>
			<div className={styles.sectionInfo}>
				<StatusCart />
				{user && user.name && <div className={styles.user}>{user.name}</div>}
			</div>

			<div className={styles.logOut} onClick={logOut}>
				<img src={Icons.logoutWhite} />
			</div>
		</div>
	);
};

export default AboutCart;
