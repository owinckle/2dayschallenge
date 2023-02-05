// Modules
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Views
import Dashboard from "./views/Dashboard";
import Login from "./views/Login";
import Signup from "./views/Signup";
import Error404 from "./views/Error404";

function App() {
	return (
		<div>
			<BrowserRouter>
				<Routes>
					<Route path="" element={<Dashboard />} />
					<Route path="/login" element={<Login />} />
					<Route path="/signup" element={<Signup />} />
					<Route path="*" element={<Error404 />} />
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
