/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		screens: {
			xxs: "230px",
			xs: "300px",
			xs1: "350px",
			sm: "400px",
			sm1: "550px",
			md: "815px",
			lg: "1024px",
			xl: "1280px",
		},
		extend: {
			colors: {
				"primary-100": "#F09637",
				"primary-200": "#DE7C14",
			},
		},
	},
	plugins: [],
};
