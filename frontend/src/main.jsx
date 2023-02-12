import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import Div100h from "react-div-100vh";
import "./assets/styles/index.scss";

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<Div100h>
			<App />
		</Div100h>
	</React.StrictMode>
);
