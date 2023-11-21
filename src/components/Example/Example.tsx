import styles from "./Example.module.scss";

const Example = (props: any) => {
	return <div className={`${styles.example} ${props.className ? props.className : ""}`}></div>;
};

export default Example;
