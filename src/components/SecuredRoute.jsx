import { Navigate } from "react-router";

const SecuredRoute = ({ component, user, authRoute }) => {
	user = true;
	if (!authRoute) {
		return user ? component : <Navigate to="/login" />;
	} else {
		return user ? <Navigate to="/dashboard" /> : component;
	}
};

export default SecuredRoute;
