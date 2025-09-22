const colors = require("tailwindcss/colors");
/** @type {import('tailwindcss').Config} */
// tailwind.config.js
const animated = require("tailwindcss-animated");
export default {
	content: {
		files: ["./index.html", "./*.{html,js}", "./partials/*.{html, css, js}"],
	},
	theme: {
		fontFamily: {
			sans: ['"Neue Plak"', "sans"],
		},
		colors: {
			transparent: "transparent",
			current: "currentColor",
			black: colors.black,
			white: colors.white,
			neutral: colors.neutral,
			red: colors.red,
			morado: "#6802C1",
			lila: "#B17DF4",
			purpura: "#440080",
			plomo: "#F4F4F4",
		},
	},
	plugins: [animated, require("@tailwindcss/forms")],
};
