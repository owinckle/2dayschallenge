import { Link } from "react-router-dom";

import "../assets/styles/sidebar.scss";

import { RxDashboard } from "react-icons/rx";
import { IoConstructOutline } from "react-icons/io5";
import { BiLogOutCircle } from "react-icons/bi";
import { supabase } from "../supbaseClient";

const Sidebar = ({ activeItem }) => {
	const logout = async () => {
		try {
			const { error } = supabase.auth.signOut();
			if (error) {
				throw error;
			} else {
				window.location.href = "/login";
			}
		} catch (error) {
			console.log(error);
		}
	};

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
				<Item
					label={<BiLogOutCircle />}
					onClick={logout}
					tooltip="Logout"
				/>
			</div>
		</div>
	);
};

const Item = ({ label, target, onClick, tooltip, isActive }) => {
	let _class = "sidebar__link";
	if (isActive) {
		_class += " sidebar__link--active";
	}

	return onClick ? (
		<div onClick={onClick} className={_class + " cursor-pointer"}>
			{label}
			<div className="sidebar__link__tooltip">{tooltip}</div>
		</div>
	) : (
		<Link to={target} className={_class}>
			{label}
			<div className="sidebar__link__tooltip">{tooltip}</div>
		</Link>
	);
};

export default Sidebar;
