import { useEffect, useState } from "react";
import styles from "./Modal.module.scss";

// components
import Button from "@/ui-components/Button/Button";

interface Modal {
	children?: any;

	state: boolean;
	title?: string | number;
	description?: string | number;
	btnOkName?: string;

	onState?: any;
	onComplete?: any;
}

const Modal = (props: Modal) => {
	const [state, setState] = useState<boolean>(props.state);

	function handlerStateModal(state: boolean) {
		props.onState(state);
	}

	function handlerCompleteModal() {
		props.onComplete();
	}

	useEffect(() => {
		setState(props.state);
	}, [props.state]);

	return (
		<>
			{state && (
				<div className={styles.modal}>
					<div className={styles.modalWrapper}>
						{props.title && <div className={styles.modalTitle}>{props.title}</div>}
						{props.description && <div className={styles.modalDescription}>{props.description}</div>}
						<div className={styles.modalContent}>{props.children}</div>
						<div className={styles.modalBtns}>
							<Button className={styles.ok} onClick={() => handlerCompleteModal()}>
								{props.btnOkName ? props.btnOkName : "ОК"}
							</Button>
							<Button className={styles.cancel} onClick={() => handlerStateModal(false)}>
								Отмена
							</Button>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default Modal;
