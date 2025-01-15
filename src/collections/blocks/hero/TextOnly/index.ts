import type { Block } from "payload";

export const TextOnlyHero: Block = {
	slug: "textonlyhero",
	interfaceName: "TextOnlyHero",
	fields: [
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
