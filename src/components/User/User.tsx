import styles from "./User.module.scss";

//store
import { useAppSelector } from "@/store/hooks/redux";

// components

const User = () => {
	// state
	const { user } = useAppSelector((state: any) => state.UsersReducer);

	return <>{user && user.name && <div className={styles.user}>{user.name}</div>}</>;
};

export default User;
