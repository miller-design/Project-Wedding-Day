/** @type {import('next').NextConfig} */
import type { NextConfig } from 'next'
import { withPayload } from '@payloadcms/next/withPayload'

const nextConfig: NextConfig = {
	reactStrictMode: true,
	images: {
		formats: ["image/avif", "image/webp"],
		remotePatterns: [
			{
				protocol: "https",
				hostname: "fakeimg.pl",
				pathname: "/**"
			}
		]
	},
	experimental: {
		reactCompiler: false
	}
};

export default withPayload(nextConfig)
