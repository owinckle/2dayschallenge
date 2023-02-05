const AuthForm = ({ onSubmit, title, subtitle, submitLabel, children }) => {
	return (
		<>
			<div className="text-center">
				<div className="text-xl">{title}</div>
				<div className="text-sm text-gray-400">{subtitle}</div>
			</div>
			<form
				onSubmit={onSubmit}
				className="flex flex-col gap-4 my-7 text-sm"
			>
				{children}
				<button className="text-white text-center w-full rounded bg-primary py-1.5 hover:bg-blue-500 transition ease-out duration-300">
					{submitLabel}
				</button>
			</form>
		</>
	);
};

export default AuthForm;
