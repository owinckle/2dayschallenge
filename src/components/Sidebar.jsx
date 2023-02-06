import { Link } from "react-router-dom";

import "../assets/styles/sidebar.scss";

import { RxDashboard } from "react-icons/rx";
import { IoConstructOutline } from "react-icons/io5";

const Sidebar = ({ activeItem }) => {
	return (
		<div className="sidebar">
			<div className="sidebar__links">
				<Item
					label={<RxDashboard />}
					target="/dashboard"
					tooltip="Dashboard"
					isActive={activeItem === 0}
				/>
				<Item
					label={<IoConstructOutline />}
					target="/projects"
					tooltip="Projects"
					isActive={activeItem === 1}
				/>
			</div>
		</div>
	);
};

const Item = ({ label, target, tooltip, isActive }) => {
	let _class = "sidebar__link";
	if (isActive) {
		_class += " sidebar__link--active";
	}

	return (
		<Link to={target} className={_class}>
			{label}
			<div className="sidebar__link__tooltip">{tooltip}</div>
		</Link>
	);
};

export default Sidebar;
