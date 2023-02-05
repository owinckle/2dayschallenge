import Sidebar from "../components/Sidebar";

// Icons
import { BiChevronRight } from "react-icons/bi";

const Projects = () => {
	return (
		<>
			<Sidebar activeItem={1} />
			<div className="fixed w-[calc(100%-15rem)] grid grid-cols-4 left-60 p-6 gap-6">
				<ProjectCard title="test" />
				<ProjectCard title="test" />
				<ProjectCard title="test" />
				<ProjectCard title="test" />
				<ProjectCard title="test" />
			</div>
		</>
	);
};

const ProjectCard = ({ title }) => {
	return (
		<div className="group shadow-md bg-gray-800 rounded p-3 hover:bg-gray-700 transition ease-in-out duration-300 cursor-pointer">
			<div className="flex justify-between items-center">
				<div>{title}</div>
				<BiChevronRight className="text-lg text-gray-400 transition ease-in-out duration-300 group-hover:text-white group-hover:scale-x-105 relative group-hover:translate-x-1" />
			</div>
		</div>
	);
};

export default Projects;
