import { useState } from "react";
import { supabase } from "../supbaseClient";

import CenterLayout from "../components/CenterLayout";
import AuthForm from "../components/AuthForm";
import { Link } from "react-router-dom";

const Login = () => {
	const [loading, setLoading] = useState(false);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleLogin = async (e) => {
		e.preventDefault();

		try {
			setLoading(true);
			const { error } = await supabase.auth.signInWithOtp({ email });
			if (error) throw error;
			alert("Check your email for the link");
		} catch (error) {
			alert(error.error_description || error.message);
		} finally {
			setLoading(false);
		}
	};

	return (
		<CenterLayout>
			<AuthForm
				onSubmit={handleLogin}
				title="Welcome back"
				subtitle="Sign in to your account"
				submitLabel="Sign in"
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
			<div className="text-sub">
				Don't have an account? <Link to="/signup">Sign up</Link>
			</div>
		</CenterLayout>
	);
};

export default Login;
