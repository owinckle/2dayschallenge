import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";

import "../assets/styles/project.scss";

import Sidebar from "../components/Sidebar";

const Project = () => {
	const { projectId } = useParams();
	const [project, setProject] = useState(null);
	const [markdown, setMarkdown] = useState("");
	const [previewMode, setPreviewMode] = useState(false);

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

				<ProjectEditor
					markdown={markdown}
					setMarkdown={setMarkdown}
					previewMode={previewMode}
				/>

				<ControlBar
					previewMode={previewMode}
					togglePreviewMode={() => setPreviewMode(!previewMode)}
				/>
			</div>
		</div>
	);
};

const ControlBar = ({ previewMode, togglePreviewMode }) => {
	return (
		<div className="project__control-bar">
			<div className="text-sub">Saved at 4:53pm</div>
			<div className="project__control-bar__controls">
				<button
					onClick={togglePreviewMode}
					className={previewMode ? "" : " transparent"}
				>
					Preview
				</button>
				<button>Save</button>
			</div>
		</div>
	);
};

const ProjectEditor = ({ markdown, setMarkdown, previewMode }) => {
	return (
		<div
			className={
				"project__editor" +
				(previewMode ? " project__editor--preview" : "")
			}
		>
			{previewMode ? (
				<ReactMarkdown
					children={markdown}
					components={{
						code({ node, inline, className, children, ...props }) {
							const match = /language-(\w+)/.exec(
								className || ""
							);
							return !inline && match ? (
								<SyntaxHighlighter
									children={String(children).replace(
										/\n$/,
										""
									)}
									style={atomDark}
									language={match[1]}
									PreTag="div"
									{...props}
								/>
							) : (
								<code className={className} {...props}>
									{children}
								</code>
							);
						},
					}}
				/>
			) : (
				<textarea
					placeholder="Start writing here..."
					value={markdown}
					onChange={(e) => setMarkdown(e.target.value)}
				></textarea>
			)}
		</div>
	);
};

export default Project;
