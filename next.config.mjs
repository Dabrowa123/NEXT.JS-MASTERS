/** @type {import('next').NextConfig} */
const nextConfig = {
	"@typescript-eslint/no-misused-promises": [
		"error",
		{
			checksVoidReturn: {
				attributes: false,
			},
		},
	],
	experimental: {
		typedRoutes: true,
		serverActions: true,
	},
	images: {
		domains: ["static-ourstore.hyperfunctor.com"],
	},
	staticPageGenerationTimeout: 300000,
	async redirects() {
		return [
			{
				source: "/products",
				destination: "/products/1",
				permanent: false,
			},
			{
				source: "/collections",
				destination: "/collections/summer-vibes",
				permanent: false,
			},
			{
				source: "/categories",
				destination: "/categories/t-shirts",
				permanent: false,
			},
			{
				source: "/categories/t-shirts",
				destination: "/categories/t-shirts/1",
				permanent: false,
			},
			{
				source: "/categories/hoodies",
				destination: "/categories/hoodies/1",
				permanent: false,
			},
			{
				source: "/categories/accessories",
				destination: "/categories/accessories/1",
				permanent: false,
			},
		];
	},
};

export default nextConfig;
