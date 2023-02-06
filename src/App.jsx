// Modules
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Views
import Dashboard from "./views/Dashboard";
import Login from "./views/Login";
import Signup from "./views/Signup";
import Error404 from "./views/Error404";
import Projects from "./views/Projects";
import Project from "./views/Project";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/dashboard" element={<Dashboard />} />
				<Route path="/projects" element={<Projects />} />
				<Route path="/project/:projectId" element={<Project />} />
				<Route path="/login" element={<Login />} />
				<Route path="/signup" element={<Signup />} />
				<Route path="*" element={<Error404 />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
