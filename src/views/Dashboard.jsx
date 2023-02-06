import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";

const Dashboard = ({ session }) => {
	const [loading, setLoading] = useState(true);
	const [username, setUsername] = useState(null);
	const [website, setWebsite] = useState(null);
	const [avatar_url, setAvatarUrl] = useState(null);

	// useEffect(() => {
	// 	getUser();
	// }, [session]);

	const getUser = async () => {
		try {
			setLoading(true);
			const { user } = session;
			let { data, error, status } = await supabase
				.from("profiles")
				.select(`username, website, avatar_url`)
				.eq("id", user.id)
				.single();

			if (error && status !== 406) throw error;

			if (data) {
				setUsername(data.username);
				setWebsite(data.website);
				setAvatarUrl(data.avatar_url);
			}
		} catch (error) {
			alert(error.message);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="app-container">
			<Sidebar activeItem={0} />
		</div>
	);
};

export default Dashboard;
