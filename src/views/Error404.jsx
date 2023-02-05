import { Link } from "react-router-dom";
import CenterLayout from "../components/CenterLayout";

const Error404 = () => {
	return (
		<CenterLayout>
			<div className="flex flex-col gap-3">
				<div className="text-center text-6xl">404</div>
				<div className="text-center">This page doesn't exist</div>
				<Link
					to="/dashboard"
					className="text-center bg-primary w-fit py-1 px-3 rounded relative left-[50%] translate-x-[-50%] hover:bg-blue-500"
				>
					Take me back
				</Link>
			</div>
		</CenterLayout>
	);
};

export default Error404;
