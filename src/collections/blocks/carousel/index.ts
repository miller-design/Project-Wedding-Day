import type { Block } from "payload";

import { UploadField } from "@/collections/fields/upload";

export const Carousel: Block = {
	slug: "carousel",
	interfaceName: "Carousel",
	fields: [
		{
			name: "slider",
			type: "array",
			minRows: 2,
			maxRows: 10,
			labels: {
				singular: "Slide",
				plural: "Slides"
			},
			fields: [
				{
					...UploadField
				},
				{
					name: "caption",
					label: "Caption",
					type: "text"
				}
			]
		}
	]
};
