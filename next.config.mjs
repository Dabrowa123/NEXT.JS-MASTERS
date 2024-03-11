/** @type {import('next').NextConfig} */
const nextConfig = {
	experimental: {
		typedRoutes: true,
	},
	// images: {
	// 	domains: ["naszsklep-api.vercel.app"],
	// },
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "**.fna.fbcdn.net",
				pathname: "/v/**",
			},
		],
	},
	staticPageGenerationTimeout: 300000,
};

export default nextConfig;
