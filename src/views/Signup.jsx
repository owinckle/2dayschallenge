import { useState } from "react";

import CenterLayout from "../components/CenterLayout";
import AuthForm from "../components/AuthForm";
import { Link } from "react-router-dom";
import { supabase } from "../supbaseClient";

const Signup = () => {
	const [loading, setLoading] = useState(false);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleSignup = async (e) => {
		e.preventDefault();

		try {
			setLoading(true);
			const { error } = await supabase.auth.signUp({
				email,
				password,
			});

			if (error) {
				throw error;
			} else {
				window.location.href = "/dashboard";
			}
		} catch (error) {
			alert(error.error_description || error.message);
		} finally {
			setLoading(false);
		}
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
			<div className="text-sub">
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
