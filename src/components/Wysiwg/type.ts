// Define a generic type for rich text content
export interface RichTextContent {
	root: {
		type: string;
		children: {
			type: string;
			version: number;
			[key: string]: unknown;
		}[];
		direction: "ltr" | "rtl" | null;
		format: "left" | "start" | "center" | "right" | "end" | "justify" | "";
		indent: number;
		version: number;
	};
	[key: string]: unknown;
}

export type WysiwygProps = {
	content: RichTextContent;
};
