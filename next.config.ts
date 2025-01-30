/** @type {import('next').NextConfig} */
import type { NextConfig } from "next";

import { withPayload } from "@payloadcms/next/withPayload";

const nextConfig: NextConfig = {
	reactStrictMode: true,
	images: {
		formats: ["image/avif", "image/webp"],
		remotePatterns: [
			{
				protocol: "https",
				hostname: "ufs.sh",
				pathname: "/f/**"
			}
		]
	},
	experimental: {
		reactCompiler: false
	},
	async redirects() {
		return [
			{
				source: "/home",
				destination: "/",
				permanent: true // Use `true` for a 308 permanent redirect, or `false` for a 307 temporary redirect
			}
		];
	}
};

export default withPayload(nextConfig);
