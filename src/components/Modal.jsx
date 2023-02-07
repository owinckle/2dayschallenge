import { useState } from "react";
import "../assets/styles/modal.scss";

const Modal = ({ title, onClose }) => {
	const [closing, setClosing] = useState(false);

	const onCloseHandler = () => {
		setClosing(true);
		setTimeout(() => {
			onClose();
		}, 300);
	};

	return (
		<>
			<div
				className={"modal-overlay" + (closing ? " modal--closing" : "")}
				onClick={onCloseHandler}
			></div>
			<div className={"modal" + (closing ? " modal--closing" : "")}>
				<div className="modal__head">
					<div className="modal__head__title">{title}</div>
				</div>

				<div className="modal__body"></div>

				<div className="modal__footer">
					<button className="transparent" onClick={onCloseHandler}>
						Cancel
					</button>
					<button>Save</button>
				</div>
			</div>
		</>
	);
};

export default Modal;
