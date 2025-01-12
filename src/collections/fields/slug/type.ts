import { CheckboxField, TextField, TextFieldClientProps } from "payload";

export type Props = {
	/** Target the desired field you want the slug to read from eg: title */
	fieldToUse: string;
	checkboxFieldPath: string;
} & TextFieldClientProps;

export type Overrides = {
	slugOverrides?: Partial<TextField>;
	checkboxOverrides?: Partial<CheckboxField>;
};

export type Slug = (fieldToUse?: string, overrides?: Overrides) => [TextField, CheckboxField];
