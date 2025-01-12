import { CollectionConfig } from "payload";

import { slugField } from "@/collections/fields/slug";

import { authenticated } from "./../access/authenticated";
import { authenticatedOrPublished } from "./../access/authenticatedOrPublished";
import { Content } from "./blocks/content";
import { seoFields } from "./fields/seo";
import { populatePublishedAt } from "./hooks/populatePublishedAt";
import { revalidateDelete, revalidatePage } from "./hooks/revalidatePage";

export const Pages: CollectionConfig = {
	slug: "pages",
	admin: {
		defaultColumns: ["title", "slug", "updatedAt"],
		useAsTitle: "title",
		group: "Content"
	},
	access: {
		create: authenticated,
		delete: authenticated,
		read: authenticatedOrPublished,
		update: authenticated
	},
	versions: {
		drafts: true
	},
	defaultPopulate: {
		title: true,
		slug: true
	},
	hooks: {
		afterChange: [revalidatePage],
		beforeChange: [populatePublishedAt],
		afterDelete: [revalidateDelete]
	},
	fields: [
		{
			name: "title",
			type: "text",
			required: true
		},
		{
			type: "tabs",
			tabs: [
				{
					name: "hero",
					label: "Hero",
					fields: []
				},
				{
					name: "content",
					label: "Content",
					fields: [
						{
							label: "Blocks",
							name: "blocks",
							type: "blocks",
							blocks: [Content]
						}
					]
				},
				{
					name: "meta",
					label: "SEO",
					fields: [...seoFields()]
				}
			]
		},
		...slugField(),
		{
			name: "publishedAt",
			type: "date",
			admin: {
				position: "sidebar"
			}
		}
	]
};
