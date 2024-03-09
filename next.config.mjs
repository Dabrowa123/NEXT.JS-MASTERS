/** @type {import('next').NextConfig} */
const nextConfig = {
	experimental: {
		typedRoutes: true,
	},
	images: {
		domains: ["naszsklep-api.vercel.app"],
	},
	staticPageGenerationTimeout: 300000,
};

export default nextConfig;
