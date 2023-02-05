/** @type {import('tailwindcss').Config} */

const colors = require("tailwindcss/colors");

module.exports = {
	content: ["./index.html", "./src/**/*.{js,jsx}", "./src/*.{js,jsx}"],
	theme: {
		extend: {
			colors: {
				gray: colors.neutral,
				primary: "#325bff",
			},
		},
	},
	plugins: [],
};
