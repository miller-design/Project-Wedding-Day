import type { Block } from "payload";

export const Countdown: Block = {
	slug: "countdown",
	interfaceName: "Countdown",
	fields: [
		{
			name: "date",
			label: "Date",
			type: "date",
			admin: {
				date: {
					pickerAppearance: "dayOnly",
					displayFormat: "DD.MM.YYYY"
				}
			}
		}
	]
};
