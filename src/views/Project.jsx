import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";

const Project = () => {
	const { projectId } = useParams();
	const [project, setProject] = useState(null);
	const [page, setPage] = useState(null);

	useEffect(() => {
		getProject();
	}, [projectId]);

	const getProject = () => {
		// Fetch the project

		// For testing purposes
		setTimeout(() => {
			setProject({
				id: projectId,
				name: "Jeff",
			});
		}, 500);
	};

	return (
		<div className="app-container">
			<Sidebar />

			<div className="app-content project">
				<div className="flex justify-between">
					<div className="flex flex-col">
						<div className="title-bottom-space">
							{project ? project.name : "..."}
						</div>
						<Link
							to="https://docs.domain.com"
							target="_blank"
							className="text-sub flex items-center"
						>
							docs.domain.com
						</Link>
					</div>
					<select>
						<option>Getting started</option>
						<option>How to something</option>
						<option>And something else?</option>
					</select>
				</div>

				<ControlBar />
			</div>
		</div>
	);
};

const ControlBar = () => {
	return (
		<div className="project__control-bar">
			<div className="text-sub">Saved at 14h58</div>
			<button>Save</button>
		</div>
	);
};

export default Project;
