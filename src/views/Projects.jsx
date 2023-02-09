import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import AppContext from "../contexts/AppContext";
import { supabase } from "../supbaseClient";

import Sidebar from "../components/Sidebar";

// Icons
import { BiChevronRight } from "react-icons/bi";

import "../assets/styles/cards.scss";
import ModalContext from "../contexts/ModalContext";

const Projects = () => {
	const { appKey, user } = useContext(AppContext);
	const { openNewProjectModal } = useContext(ModalContext);
	const [projects, setProjects] = useState([]);

	useEffect(() => {
		getProjects();
	}, [appKey]);

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
			<div className="app-content">
				<button className="row-spacer" onClick={openNewProjectModal}>New project</button>
				<div className="grid grid-4">
					{projects.map((project, key) => (
						<ProjectCard
							key={key}
							title={project.name}
							target={"/project/" + project.id}
						/>
					))}
				</div>
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
