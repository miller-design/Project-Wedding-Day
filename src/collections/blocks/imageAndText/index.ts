import { FixedToolbarFeature, HeadingFeature, InlineToolbarFeature, lexicalEditor } from "@payloadcms/richtext-lexical";
import type { Block } from "payload";

export const ImageAndText: Block = {
	slug: "image_and_text",
	interfaceName: "ImageAndText",
	labels: {
		plural: "Image & Text",
		singular: "Image & Text"
	},
	fields: [
		{
			name: "layout",
			label: "Layout",
			type: "select",
			required: true,
			options: [
				{
					label: "text - image",
					value: "layoutA"
				},
				{
					label: "image - text",
					value: "layoutB"
				}
			]
		},
		{
			name: "header",
			label: "Header",
			type: "text"
		},
		{
			name: "content",
			label: "Content",
			type: "richText",
			editor: lexicalEditor({
				features: ({ rootFeatures }) => {
					return [
						...rootFeatures,
						HeadingFeature({ enabledHeadingSizes: ["h2", "h3", "h4"] }),
						FixedToolbarFeature(),
						InlineToolbarFeature()
					];
				}
			})
		}
	]
};
