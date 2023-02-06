const AuthForm = ({ onSubmit, title, subtitle, submitLabel, children }) => {
	return (
		<>
			<div className="text-center flex flex-col auth-modal__head">
				<div className="text-xl">{title}</div>
				<div className="text-sub">{subtitle}</div>
			</div>
			<form
				onSubmit={onSubmit}
				className="flex flex-col auth-modal__form"
			>
				{children}
				<button>{submitLabel}</button>
			</form>
		</>
	);
};

export default AuthForm;
