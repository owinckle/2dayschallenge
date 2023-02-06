const CenterLayout = ({ children }) => {
	return (
		<div
			style={{
				display: "flex",
				height: "100vh",
				justifyContent: "center",
				alignItems: "center",
			}}
		>
			<div className="bg-2 rounded flex flex-col auth-modal">
				{children}
			</div>
		</div>
	);
};

export default CenterLayout;
