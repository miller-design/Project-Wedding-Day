import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
	return {
		rules: {
			userAgent: "*",
			// disallow: "/"
			allow: '/'
		},
		sitemap: "https://jp-wedding.day/sitemap.xml"
	};
}
