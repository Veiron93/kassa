// Styles
import "./button.scss";

const Button = function (props: any) {
	let className = props.className ? props.className : "";

	return (
		<div className={`button ${className}`} onClick={props.onClick ?? props.onClick}>
			{props.children}
		</div>
	);
};

export default Button;
