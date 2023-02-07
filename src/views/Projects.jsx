import { Link } from "react-router-dom";

import Sidebar from "../components/Sidebar";

// Icons
import { BiChevronRight } from "react-icons/bi";

import "../assets/styles/cards.scss";
import { useContext, useEffect, useState } from "react";
import AppContext from "../contexts/AppContext";
import { supabase } from "../supbaseClient";

const Projects = () => {
	const { user } = useContext(AppContext);
	const [projects, setProjects] = useState([]);

	useEffect(() => {
		getProjects();
	}, []);

	const getProjects = async () => {
		const { data, error } = await supabase
			.from("projects")
			.select(`id, name`)
			.eq("user_uuid", user.id);

		setProjects(data);
	};

	return (
		<div className="app-container">
			<Sidebar activeItem={1} />
			<div className="app-content grid grid-4">
				{projects.map((project, key) => (
					<ProjectCard
						key={key}
						title={project.name}
						target={"/project/" + project.id}
					/>
				))}
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
