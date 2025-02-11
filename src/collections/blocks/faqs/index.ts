import { FixedToolbarFeature, HeadingFeature, InlineToolbarFeature, lexicalEditor } from "@payloadcms/richtext-lexical";
import type { Block } from "payload";

export const FAQS: Block = {
	slug: "faqs",
	interfaceName: "FAQS",
	labels: {
		plural: "FAQS",
		singular: "FAQ"
	},
	fields: [
		{
			name: "questions",
			label: "Questions",
			type: "array",
			fields: [
				{
					name: "question",
					label: "Question",
					type: "text"
				},
				{
					name: "answer",
					label: "Answer",
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
		}
	]
};
