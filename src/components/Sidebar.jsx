import { Link } from "react-router-dom";

import "../assets/styles/sidebar.scss";

const Sidebar = ({ activeItem }) => {
	return (
		<div className="sidebar">
			<div className="sidebar__title">Ishin</div>
			<div className="sidebar__links">
				<Item
					label="Dashboard"
					target="/dashboard"
					isActive={activeItem === 0}
				/>
				<Item
					label="Projects"
					target="/projects"
					isActive={activeItem === 1}
				/>
			</div>
		</div>
	);
};

const Item = ({ label, target, isActive }) => {
	let _class = "sidebar__link";
	if (isActive) {
		_class += " sidebar__link--active";
	}

	return (
		<Link to={target} className={_class}>
			{label}
		</Link>
	);
};

export default Sidebar;
