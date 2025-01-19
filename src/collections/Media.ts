import type { CollectionConfig } from "payload";

export const Media: CollectionConfig = {
	slug: "media",
	admin: {
		defaultColumns: ["fileName", "updatedAt"],
		group: "Content"
	},
	access: {
		read: () => true
	},
	upload: {
		staticDir: "media",
		imageSizes: [
			{
				name: "square",
				width: 400,
				height: 400,
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
