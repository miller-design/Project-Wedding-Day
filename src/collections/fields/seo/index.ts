import type { TextareaField, TextField } from "payload";

// TODO - Add OG Image field here once we have media field created

const seoFields = () => {
	const seoTitle: TextField = {
		name: "title",
		label: "Text",
		type: "text"
	};

	const seoDescription: TextareaField = {
		name: "description",
		label: "Description",
		type: "textarea"
	};

	return [seoTitle, seoDescription];
};

export { seoFields };
