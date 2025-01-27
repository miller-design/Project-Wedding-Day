import { FixedToolbarFeature, HeadingFeature, InlineToolbarFeature, lexicalEditor } from "@payloadcms/richtext-lexical";
import type { Block } from "payload";

export const FormAndText: Block = {
	slug: "formAndText",
	interfaceName: "FormAndText",
	labels: {
		plural: "Contact Form & Text",
		singular: "Contact Form & Text"
	},
	fields: [
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
