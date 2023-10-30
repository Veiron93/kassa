import { useState, useEffect } from "react";

import styles from "./buttonGroup.module.scss";

interface props {
	btns: Array<{
		name: string;
		value: string | number | boolean;
	}>;

	classStyle?: string;
	onChange?: any;
	activeItem?: any;
}

const ButtonGroup = (props: props) => {
	let buttons = props.btns;
	let classStyle = props.classStyle;
	let onChange = props.onChange;

	const [activeItem, setActiveItem] = useState(props.activeItem ? props.activeItem : buttons[0].value);

	function current(e: React.MouseEvent<HTMLElement>) {
		const element = e.target as HTMLElement;
		const value = element.getAttribute("data-value");

		setActiveItem(value);
		handlerChange(value);
	}

	function handlerChange(value: string | null) {
		onChange(value);
	}

	return (
		<div className={`${styles.buttonGroup} ${classStyle}`}>
			{buttons.map((button: any, index: number) => (
				<div
					className={`${styles.buttonGroupBtn} ${activeItem == button.value && styles.buttonGroupBtnActive}`}
					key={index}
					data-current={button.current}
					data-value={button.value}
					onClick={current}
				>
					{button.name}
				</div>
			))}
		</div>
	);
};

export default ButtonGroup;
