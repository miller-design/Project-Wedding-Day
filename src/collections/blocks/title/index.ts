import type { Block } from "payload";

export const Title: Block = {
	slug: "title",
	interfaceName: "Title",
	fields: [
		{
			name: "label",
			label: "Label",
			type: "text"
		},
		{
			name: "header",
			label: "Header",
			type: "text"
		}
	]
};
