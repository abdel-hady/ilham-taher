/** @type {import('tailwindcss').Config} */

const { colors: defaultColors } = require("tailwindcss/defaultTheme");

module.exports = {
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			container: {
				center: true,
				padding: {
					DEFAULT: "0.5rem",
					sm: "1rem",
					lg: "1.5rem",
					xl: "3rem",
				},
			},
			colors: {
				transparent: "transparent",
				current: "currentColor",
				greenish: "#0c4648",
				brownish: "#957345",
				golden: "#ECCC79",
				"dark-gold": "#DFB05A",
				"dark-green": "#0E3031",
			},
			backgroundImage: {
				"gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
				"gradient-conic":
					"conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
			},
		},
	},
	daisyui: {
		themes: ["light"],
	},
	plugins: [require("daisyui")],
};
