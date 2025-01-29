import type { Field } from "payload";

const urlField: Field = {
	name: "url",
	label: "URL Link",
	type: "text",
	validate: (value?: string | null) => {
		if (!value) {
			return "URL is required";
		}

		try {
			new URL(value);
			return true;
		} catch {
			return "Invalid URL";
		}
	},
	admin: {
		condition: (data, siblingData) => {
			if (siblingData?.link_type === "external") {
				return true;
			} else {
				return false;
			}
		}
	}
};

const pageField: Field = {
	name: "page",
	label: "Page Link",
	type: "relationship",
	relationTo: "pages",
	admin: {
		condition: (data, siblingData) => {
			if (siblingData?.link_type === "internal") {
				return true;
			} else {
				return false;
			}
		}
	}
};

export const LinkField: Field = {
	name: "link",
	label: "Link",
	type: "group",
	fields: [
		{
			name: "link_type",
			label: "Link Type",
			type: "radio",
			options: [
				{
					label: "Internal",
					value: "internal"
				},
				{
					label: "External",
					value: "external"
				}
			],
			defaultValue: "internal",
			admin: {
				layout: "horizontal"
			}
		},
		{
			...urlField
		},
		{
			...pageField
		},
		{
			name: "link_text",
			label: "Link Text",
			type: "text"
		}
	]
};
