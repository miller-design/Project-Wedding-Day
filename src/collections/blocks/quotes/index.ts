import type { Block } from "payload";

export const Quotes: Block = {
	slug: "quotes",
	interfaceName: "Quotes",
	labels: {
		plural: "Quotes",
		singular: "Quote"
	},
	fields: [
		{
			name: "quotes",
			label: false,
			type: "array",
			minRows: 1,
			maxRows: 2,
			fields: [
				{
					name: "credit",
					label: "Credit",
					type: "text"
				},
				{
					name: "quote",
					label: "Quote",
					type: "text"
				}
			]
		}
	]
};
