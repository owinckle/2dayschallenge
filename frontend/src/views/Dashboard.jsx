import Sidebar from "../components/Sidebar";

const Dashboard = ({ session }) => {
	return (
		<div className="app-container">
			<Sidebar activeItem={0} />
		</div>
	);
};

export default Dashboard;
