// Modules
import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { supabase } from "./supbaseClient";

// Views
import Dashboard from "./views/Dashboard";
import Login from "./views/Login";
import Signup from "./views/Signup";
import Error404 from "./views/Error404";
import Projects from "./views/Projects";
import Project from "./views/Project";
import SecuredRoute from "./components/SecuredRoute";

// Contexts
import AppContext from "./contexts/AppContext";
import ModalContext from "./contexts/ModalContext";
import Modal, { ModalInput } from "./components/Modal";
import Notifications from "./components/Notifications";

function App() {
	const [appKey, setAppKey] = useState(Date.now());
	const [loading, setLoading] = useState(true);
	const [user, setUser] = useState(null);

	const updateAppKey = () => {
		setAppKey(Date.now());
	}

	// New project
	const [newProjectModal, setNewProjectModal] = useState(false);
	const [newProjectName, setNewProjectName] = useState("");

	const createNewProject = async () => {
		if (newProjectName === "") {
			return {
				error: true,
				error_message: "A project name is required"
			}
		}

		const { error } = await supabase.from("projects").insert({
			name: newProjectName,
			user_uuid: user.id
		})

		if (error) {
			if (error.code == "23505") { // Duplicate name
				return {
					error: true,
					error_message: "A project with this name already exists"
				}
			}
		}

		updateAppKey();
		createNotification("Project created", newProjectName + " has been created");
		setNewProjectName("");
	}

	// New page
	const [newPageModal, setNewPageModal] = useState(false);
	const [newPageProjectId, setNewPageProjectId] = useState(null);
	const [newPageName, setNewPageName] = useState("");

	const openNewPageModal = (projectId) => {
		setNewPageModal(true);
		setNewPageProjectId(projectId);
		setNewPageName("");
	};

	const createNewPage = async () => {
		if (newPageName === "") {
			return {
				error: true,
				error_message: "A page name is required"
			};
		}

		const { error } = await supabase.from("pages").insert({
			name: newPageName,
			project: newPageProjectId,
			content: "# " + newPageName
		})

		createNotification("Page created", newPageName + " has been created");
	};

	// Notifications
	const [notifications, setNotifications] = useState([]);

	const createNotification = (title, details) => {
		setNotifications((prevNotifications) => [{
			id: Date.now(),
			title: title,
			details: details,
			seen: false
		}, ...prevNotifications]);
	}

	const removeNotification = (id) => {
		setNotifications((prevNotifications) => prevNotifications.filter((noti) => noti.id !== id));
	};

	useEffect(() => {
		checkAuth();
	}, []);

	const checkAuth = async () => {
		try {
			const { data: sessionData } = await supabase.auth.getSession();

			if (sessionData.session) {
				const { data: userData, error: userError } =
					await supabase.auth.getUser(
						sessionData.session.access_token
					);
				if (!userError) {
					setUser(userData.user);
				}
			}
		} catch (error) {
			console.log(error.error_description || error.message);
		} finally {
			setLoading(false);
		}
	};

	if (loading) {
		return <div>loading...</div>;
	}

	return (
		<AppContext.Provider value={{ appKey: appKey, user, createNotification }}>
			<ModalContext.Provider
				value={{
					openNewProjectModal: () => setNewProjectModal(true),
					openNewPageModal: openNewPageModal
				}}
			>
				<BrowserRouter>
					<Routes>
						<Route
							path="/dashboard"
							element={
								<SecuredRoute
									component={<Dashboard />}
									user={user}
								/>
							}
						/>
						<Route
							path="/projects"
							element={
								<SecuredRoute
									component={<Projects />}
									user={user}
								/>
							}
						/>
						<Route
							path="/project/:projectId"
							element={
								<SecuredRoute
									component={<Project />}
									user={user}
								/>
							}
						/>
						<Route
							path="/login"
							element={
								<SecuredRoute
									component={<Login />}
									user={user}
									authRoute
								/>
							}
						/>
						<Route
							path="/signup"
							element={
								<SecuredRoute
									component={<Signup />}
									user={user}
									authRoute
								/>
							}
						/>
						<Route path="*" element={<Error404 />} />
					</Routes>

					{/* Notifications */}
					<Notifications notifications={notifications} removeNotification={removeNotification} />

					{/* Modals */}
					{newPageModal ? (
						<Modal
							title="Create a new page"
							onClose={() => setNewPageModal(false)}
							onSubmit={createNewPage}
						>
							<ModalInput
								type="text"
								label="Name"
								value={newPageName}
								placeholder="Some page name"
								onChange={setNewPageName}
								autoFocus
							/>
						</Modal>
					) : null}

					{newProjectModal ?
						<Modal title="Create a new project" onClose={() => setNewProjectModal(false)} onSubmit={createNewProject}>
							<ModalInput
								type="text"
								label="Name"
								value={newProjectName}
								placeholder="My awesome project"
								onChange={setNewProjectName}
								autoFocus
							/>
						</Modal>
						: null}
				</BrowserRouter>
			</ModalContext.Provider>
		</AppContext.Provider>
	);
}

export default App;
