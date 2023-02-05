import { useState } from "react";

import CenterLayout from "../components/CenterLayout";
import AuthForm from "../components/AuthForm";
import { Link } from "react-router-dom";

const Signup = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleSignup = async (e) => {
		e.preventDefault();
	};

	return (
		<CenterLayout>
			<AuthForm
				onSubmit={handleSignup}
				title="Welcome"
				subtitle="Create an account to get started"
				submitLabel="Sign up"
			>
				<input
					type="email"
					placeholder="Your email"
					value={email}
					autoComplete="off"
					onChange={(e) => setEmail(e.target.value)}
				/>
				<input
					type="password"
					placeholder="***********"
					value={password}
					autoComplete="off"
					onChange={(e) => setPassword(e.target.value)}
				/>
			</AuthForm>
			<div className="text-gray-400 text-sm">
				Already have an account?{" "}
				<Link
					to="/login"
					className="text-white underline cursor-pointer"
				>
					Log in
				</Link>
			</div>
		</CenterLayout>
	);
};

export default Signup;
