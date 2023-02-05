const CenterLayout = ({ children }) => {
	return (
		<div className="flex h-screen justify-center items-center">
			<div className="shadow-md w-96 p-6 bg-gray-800 rounded">
				{children}
			</div>
		</div>
	);
};

export default CenterLayout;
