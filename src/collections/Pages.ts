import { CollectionConfig } from "payload";

import { slugField } from "@/collections/fields/slug";

import { authenticated } from "./../access/authenticated";
import { authenticatedOrPublished } from "./../access/authenticatedOrPublished";
import { Carousel } from "./blocks/carousel";
import { Content } from "./blocks/content";
import { FAQS } from "./blocks/faqs";
import { FormAndText } from "./blocks/formAndText";
import { FullscreenHero } from "./blocks/hero/fullscreen";
import { TextOnlyHero } from "./blocks/hero/TextOnly";
import { ImageAndText } from "./blocks/imageAndText";
import { ImageCTA } from "./blocks/imageCTA";
import { Quotes } from "./blocks/quotes";
import { Title } from "./blocks/title";
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
					fields: [
						{
							label: "Blocks",
							name: "blocks",
							type: "blocks",
							maxRows: 1,
							blocks: [FullscreenHero, TextOnlyHero]
						}
					]
				},
				{
					name: "content",
					label: "Content",
					fields: [
						{
							label: "Blocks",
							name: "blocks",
							type: "blocks",
							blocks: [Title, Content, ImageCTA, Carousel, ImageAndText, Quotes, FormAndText, FAQS]
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
