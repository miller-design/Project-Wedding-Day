import type { CheckboxField, TextField } from "payload";
import { formatSlugHook } from "../hooks/formatSlug";
import { Slug } from "./type";

const slugField: Slug = (fieldToUse = "title", overrides = {}) => {
	const { slugOverrides, checkboxOverrides } = overrides;
	const checkBoxField: CheckboxField = {
		name: "slugLock",
		type: "checkbox",
		defaultValue: true,
		admin: {
			hidden: true,
			position: "sidebar"
		},
		...checkboxOverrides
	};
	// @ts-expect-error: Partial<TextField> is used intentionally
	const slugField: TextField = {
		name: "slug",
		type: "text",
		index: true,
		label: "Slug",
		...(slugOverrides || {}),
		hooks: {
			// Kept this in for hook or API based updates
			beforeValidate: [formatSlugHook(fieldToUse)]
		},
		admin: {
			position: "sidebar",
			...(slugOverrides?.admin || {}),
			components: {
				Field: {
					path: "@/collections/fields/slug/SlugComponent#SlugComponent",
					clientProps: {
						fieldToUse,
						checkboxFieldPath: checkBoxField.name
					}
				}
			}
		}
	};

	return [slugField, checkBoxField];
};

export { slugField };
