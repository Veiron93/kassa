import styles from "./User.module.scss";

//store
import { useAppSelector } from "@/store/hooks/redux";

const User = () => {
	// STORE
	// state
	const { activeUserId, users } = useAppSelector((state: any) => state.UsersReducer);
	// --

	const user = users.find((user: any) => user.id === activeUserId);

	return <>{user && user.first_name && <div className={styles.user}>{user.first_name}</div>}</>;
};

export default User;
