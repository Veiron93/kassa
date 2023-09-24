// Styles
import "./ButtonIcon.scss";

const ButtonIcon = function (props: any) {
	const img = props.img;

	return (
		<div className={`buttonIcon ${props.className}`}>
			<img src={img} />
		</div>
	);
};

export default ButtonIcon;
