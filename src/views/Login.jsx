// Modules
import { useState } from "react";
import { supabase } from "../supbaseClient";

const Login = () => {
	const [loading, setLoading] = useState(false);
	const [email, setEmail] = useState("");

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
		<div className="flex h-screen justify-center items-center">
			<div className="shadow-md w-96 p-6 bg-gray-800 rounded">
				<div className="text-center text-white">
					<div className="text-xl">Welcome back</div>
					<div className="text-sm text-gray-400">
						Sign in to your account
					</div>
				</div>
				<form
					onSubmit={handleLogin}
					className="flex flex-col gap-4 my-7 text-sm"
				>
					<input
						id="email"
						className="w-full py-1.5 px-3 rounded border border-gray-700 bg-transparent focus:outline-none focus:border-green-400 transition ease-in-out duration-300 text-white"
						type="email"
						placeholder="Your email"
						value={email}
						autoComplete="off"
						onChange={(e) => setEmail(e.target.value)}
					/>
					<button className="text-white text-center w-full rounded bg-green-700 py-1.5 hover:bg-green-600 transition ease-out duration-300">
						{loading ? "Sending magic link..." : "Send magic link"}
					</button>
				</form>
				<div className="text-gray-400 text-sm">
					Don't have an account?{" "}
					<span className="text-white underline cursor-pointer">
						Sign up
					</span>
				</div>
			</div>
		</div>
	);
};

export default Login;
