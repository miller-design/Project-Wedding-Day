import type { Block } from "payload";

import { LinkField } from "@/collections/fields/link";
import { UploadField } from "@/collections/fields/upload";

export const ImageCTA: Block = {
	slug: "imagecta",
	labels: {
		plural: "Image CTA's",
		singular: "Image CTA"
	},
	interfaceName: "ImageCTA",
	fields: [
		{
			...UploadField
		},
		{
			name: "label",
			label: "Label",
			type: "text"
		},
		{
			name: "header",
			label: "Header",
			type: "text"
		},
		{
			...LinkField
		}
	]
};
