/** @type {import('next').NextConfig} */
const nextConfig = {
	publicRuntimeConfig: {
		NEXT_PUBLIC_BACKEND_URI: process.env.NEXT_PUBLIC_BACKEND_URI,
	},
};

module.exports = nextConfig;
