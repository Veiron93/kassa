// Styles
import { Children } from "react";
import "./button.scss";

const Button = function (props: any) {
	return <div className={`button ${props.className}`}>{props.children}</div>;
};

export default Button;
