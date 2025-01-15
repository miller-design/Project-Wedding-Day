import type { Block } from "payload";

import { UploadField } from "@/collections/fields/upload";

export const FullscreenHero: Block = {
	slug: "fullscreenHero",
	interfaceName: "FullscreenHero",
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
			name: "title",
			label: "Title",
			type: "text"
		},
		{
			name: "message",
			label: "Message",
			type: "text"
		}
	]
};
