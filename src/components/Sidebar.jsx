import { Link } from "react-router-dom";

const Sidebar = ({ activeItem }) => {
	return (
		<div className="flex fixed top-0 left-0 h-screen flex-col w-60 shadow-md bg-gray-800">
			<div className="text-center py-5 text-xl border-b border-gray-700 mb-3">
				UserMD
			</div>
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
	);
};

const Item = ({ label, target, isActive }) => {
	let _class = "sidebar__link";
	if (isActive) {
		_class += " bg-primary hover:text-white";
	}

	return (
		<Link to={target} className={_class}>
			{label}
		</Link>
	);
};

export default Sidebar;
