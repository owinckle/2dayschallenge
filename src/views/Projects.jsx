import { Link } from "react-router-dom";

import Sidebar from "../components/Sidebar";

// Icons
import { BiChevronRight } from "react-icons/bi";

import "../assets/styles/cards.scss";

const Projects = () => {
	return (
		<div className="app-container">
			<Sidebar activeItem={1} />
			<div className="app-content grid grid-4">
				<ProjectCard title="test" target="/project/1" />
				<ProjectCard title="test" target="/project/2" />
				<ProjectCard title="test" target="/project/3" />
				<ProjectCard title="test" target="/project/4" />
				<ProjectCard title="test" target="/project/5" />
			</div>
		</div>
	);
};

const ProjectCard = ({ title, target }) => {
	return (
		<Link to={target} className="card cursor-pointer card-project">
			<div className="flex justify-between items-center">
				<div>{title}</div>
				<BiChevronRight className="text-xl card-project__icon" />
			</div>
		</Link>
	);
};

export default Projects;
