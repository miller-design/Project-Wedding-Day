import type { CollectionConfig } from "payload";

export const Media: CollectionConfig = {
	slug: "media",
	admin: {
		defaultColumns: ["fileName", "updatedAt"],
		group: "Content"
	},
	upload: {
		staticDir: "media",
		imageSizes: [
			{
				name: "square",
				width: 400,
				height: 400,
				position: "centre"
			},
			{
				name: "small",
				width: 700,
				position: "centre"
			},
			{
				name: "medium",
				width: 1200,
				height: undefined,
				position: "centre"
			},
			{
				name: "large",
				width: 2400,
				height: undefined,
				position: "centre"
			},
			{
				name: "xlarge",
				width: 4000,
				height: undefined,
				position: "centre"
			}
		],
		adminThumbnail: "square",
		mimeTypes: ["image/*"],
		disableLocalStorage: true
	},
	fields: [
		{
			name: "alt",
			type: "text"
		}
	]
};
