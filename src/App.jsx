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
	const [loading, setLoading] = useState(true);
	const [user, setUser] = useState(null);

	// New page
	const [newPageModal, setNewPageModal] = useState(false);
	const [newPageProject, setNewPageProject] = useState(null);
	const [newPageName, setNewPageName] = useState("");

	const openNewPageModal = (project) => {
		setNewPageModal(true);
		setNewPageProject(project);
		setNewPageName("");
	};

	const createNewPage = () => {
		if (newPageName === "") {
			return {
				error: true,
				error_message: "A name is required",
			};
		}
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
		<AppContext.Provider value={{ user, createNotification }}>
			<ModalContext.Provider
				value={{
					openNewPageModal: openNewPageModal,
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
							title="Create new page"
							onClose={() => setNewPageModal(false)}
							onSubmit={createNewPage}
						>
							<ModalInput
								type="text"
								label="Name"
								value={newPageName}
								onChange={setNewPageName}
							/>
						</Modal>
					) : null}
				</BrowserRouter>
			</ModalContext.Provider>
		</AppContext.Provider>
	);
}

export default App;
