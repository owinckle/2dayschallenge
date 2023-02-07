import { useState } from "react";
import "../assets/styles/modal.scss";

const Modal = ({ title, onClose, onSubmit, children }) => {
	const [closing, setClosing] = useState(false);

	const onCloseHandler = async (callback) => {
		if (callback) {
			const response = await callback();
			if (response.error) {
				// Add error message

				return;
			}
		}
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

				<div className="modal__body">{children}</div>

				<div className="modal__footer">
					<button
						className="transparent"
						onClick={() => onCloseHandler(null)}
					>
						Cancel
					</button>
					<button onClick={() => onCloseHandler(onSubmit)}>
						Save
					</button>
				</div>
			</div>
		</>
	);
};

export const ModalInput = ({ type, label, value, onChange }) => {
	return (
		<div className="modal__body__input">
			<label>{label}</label>
			<input
				type={type}
				value={value}
				onChange={(e) => onChange(e.target.value)}
			/>
		</div>
	);
};

export default Modal;
