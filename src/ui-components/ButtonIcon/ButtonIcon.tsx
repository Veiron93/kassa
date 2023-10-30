// Styles
import "./ButtonIcon.scss";

interface Props {
	className: string;
	img: string;
	event: any;
}

const ButtonIcon = function (props: Props) {
	const img = props.img;
	const event = props.event;

	return (
		<div className={`buttonIcon ${props.className}`} onClick={event && event}>
			<img src={img} />
		</div>
	);
};

export default ButtonIcon;
