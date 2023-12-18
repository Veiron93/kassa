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
	stateBtnCancel?: boolean;
	error?: string | null;

	onState?: any;
	onComplete?: any;
	onCallbackBtns?: any;

	btns?: Array<any>;
}

const Modal = (props: Modal) => {
	const [state, setState] = useState<boolean>(props.state);
	const [stateBtnCancel, setStateBtnCancel] = useState<boolean>(props.stateBtnCancel ?? true);

	function handlerStateModal(state: boolean) {
		props.onState(state);
	}

	function handlerCompleteModal() {
		props.onComplete();
	}

	function handlerCallbackBtn(code: string) {
		props.onCallbackBtns(code);
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

						{props.error && <div className={styles.modalError}>{props.error}</div>}

						<div className={styles.modalBtns}>
							<Button className={styles.ok} onClick={() => handlerCompleteModal()}>
								{props.btnOkName ? props.btnOkName : "ОК"}
							</Button>

							{stateBtnCancel && (
								<Button className={styles.cancel} onClick={() => handlerStateModal(false)}>
									Отмена
								</Button>
							)}

							{props.btns &&
								props.btns.length > 0 &&
								props.btns.map(
									(btn, index) =>
										btn.state && (
											<Button key={index} onClick={() => handlerCallbackBtn(btn.code)}>
												{btn.name}
											</Button>
										)
								)}
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default Modal;
