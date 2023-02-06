import { Link } from "react-router-dom";
import CenterLayout from "../components/CenterLayout";

const Error404 = () => {
	return (
		<CenterLayout>
			<div className="error404 flex flex-col">
				<div className="text-center text-6xl">404</div>
				<div className="text-center">This page doesn't exist</div>
				<Link to="/dashboard" className="text-center">
					<button>Take me back</button>
				</Link>
			</div>
		</CenterLayout>
	);
};

export default Error404;
