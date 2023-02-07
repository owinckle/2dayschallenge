import { IoClose } from "react-icons/io5";
import "../assets/styles/notifications.scss";

const Notifications = () => {
	return (
		<div className="notifications">
			<Notification title="Created" details="Page has been created" />
			<Notification title="Created" details="Page has been created" />
			<Notification title="Created" details="Page has been created" />
			<Notification title="Created" details="Page has been created" />
			<Notification title="Created" details="Page has been created" />
			<Notification title="Created" details="Page has been created" />
			<Notification title="Created" details="Page has been created" />
			<Notification title="Created" details="Page has been created" />
			<Notification title="Created" details="Page has been created" />
			<Notification title="Created" details="Page has been created" />
			<Notification title="Created" details="Page has been created" />
			<Notification title="Created" details="Page has been created" />
			<Notification title="Created" details="Page has been created" />
			<Notification title="Created" details="Page has been created" />
			<Notification title="Created" details="Page has been created" />
			<Notification title="Created" details="Page has been created" />
			<Notification title="Created" details="Page has been created" />
			<Notification title="Created" details="Page has been created" />
			<Notification title="Created" details="Page has been created" />
			<Notification title="Created" details="Page has been created" />
			<Notification title="Created" details="Page has been created" />
			<Notification title="Created" details="Page has been created" />
			<Notification title="Created" details="Page has been created" />
			<Notification title="Created" details="Page has been created" />
			<Notification title="Created" details="Page has been created" />
			<Notification title="Created" details="Page has been created" />
		</div>
	);
};

const Notification = ({ title, details }) => {
	return (
		<div className="notification">
			<div className="notification__header">
				<div className="notification__title">{title}</div>
				<IoClose className="notification__close" />
			</div>
			<div className="notification__details">{details}</div>
		</div>
	);
};

export default Notifications;
