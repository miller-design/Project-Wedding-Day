import { MetadataRoute } from "next";

import { queryCollection } from "@/lib/Payload/queries";

import { Page } from "@/payload-types";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const baseUrl = "https://jp-wedding.day";
	// Static pages
	const staticPages = [
		{
			url: baseUrl,
			lastModified: new Date(),
			changeFrequency: "monthly" as const,
			priority: 1
		}
	];
	// Get actual data for dynamic routes
	try {
		const allPages = (await queryCollection({ collection: "pages" })) as Page[];
		const dynamicPages = allPages.map((post) => ({
			url: `${baseUrl}/${post.slug}`,
			lastModified: new Date(post.updatedAt),
			changeFrequency: "weekly" as const,
			priority: 0.7
		}));

		return [...staticPages, ...dynamicPages];
	} catch (error) {
		console.error("Error generating sitemap:", error);
		return staticPages; // Fallback to just static pages if database query fails
	}
}
