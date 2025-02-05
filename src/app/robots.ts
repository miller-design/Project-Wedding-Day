import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
	return {
		rules: {
			userAgent: "*",
			disallow: "/"
			// allow: '/' // when production is ready uncomment this and comment the above
		},
		sitemap: "https://jp-wedding.day/sitemap.xml"
	};
}
