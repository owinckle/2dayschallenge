import { useContext, useState } from "react";
import "../assets/styles/modal.scss";
import AppContext from "../contexts/AppContext";

const Modal = ({ title, onClose, onSubmit, children }) => {
	const { createNotification } = useContext(AppContext);

	const [closing, setClosing] = useState(false);

	const onCloseHandler = async (callback) => {
		if (callback) {
			const response = await callback();
			if (response && response.error) {
				createNotification("Error", response.error_message);
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
				onClick={() => onCloseHandler(null)}
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
