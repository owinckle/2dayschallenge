import { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import "../assets/styles/notifications.scss";

const Notifications = ({ notifications, removeNotification }) => {
	return (
		<div className="notifications">
			{notifications.map((noti) => (
				<Notification
					key={noti.id}
					title={noti.title}
					details={noti.details}
					onClose={() => removeNotification(noti.id)}
				/>
			))}
		</div>
	);
};

const Notification = ({ title, details, onClose }) => {
	const [closing, setClosing] = useState(false);

	const onCloseHandler = () => {
		setClosing(true);
		setTimeout(() => {
			onClose();
		}, 300);
	};

	useEffect(() => {
		setTimeout(() => {
			onCloseHandler();
		}, 3000);
	});

	return (
		<div
			className={
				"notification" + (closing ? " notification--closing" : "")
			}
		>
			<div className="notification__header">
				<div className="notification__title">{title}</div>
				<IoClose
					className="notification__close"
					onClick={onCloseHandler}
				/>
			</div>
			<div className="notification__details">{details}</div>
		</div>
	);
};

export default Notifications;
