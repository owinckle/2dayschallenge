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
import Modal from "./components/Modal";

function App() {
	const [loading, setLoading] = useState(true);
	const [user, setUser] = useState(null);

	// New page
	const [newPageModal, setNewPageModal] = useState(false);

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
		<AppContext.Provider value={{ user }}>
			<ModalContext.Provider
				value={{
					openNewPageModal: () => setNewPageModal(true),
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

					{/* Modals */}
					{newPageModal ? (
						<Modal
							title="Create new page"
							onClose={() => setNewPageModal(false)}
						></Modal>
					) : null}
				</BrowserRouter>
			</ModalContext.Provider>
		</AppContext.Provider>
	);
}

export default App;
