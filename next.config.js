/** @type {import('next').NextConfig} */
const nextConfig = {
	typescript: {
		tsconfigPath: "./tsconfig.json",
	},
	images: {
		domains: [
			"cdn-icons-png.flaticon.com",
			"dev.backend.elham.garonzlab.com",
			"daisyui.com",
			"dev.backend.ilhemtaher.com",
			"stg.backend.ilhemtaher.com",
			"backend.ilhemtaher.com",
			"127.0.0.1:3007",
			"127.0.0.1",
			"localhost",
		],
	},
	env: {
		BASE_URL: process.env.BACKEND_BASE_URL,
		STRIPE_PUBLIC_KEY: process.env.STRIPE_PUBLIC_KEY,
		WEBSITE_BASE_URL: process.env.WEBSITE_BASE_URL,
		VIP_SESSION_KEY: process.env.VIP_SESSION_KEY,
		VIMEO_PRIVATE_KEY: process.env.VIMEO_PRIVATE_KEY,
		PAYPAL_CLIENT_ID: process.env.PAYPAL_CLIENT_ID,
	},
	compiler: {
		styledComponents: true,
	},
};

module.exports = nextConfig;
