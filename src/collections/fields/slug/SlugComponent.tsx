"use client";
import React, { useCallback, useEffect } from "react";
import { formatSlug } from "../hooks/formatSlug";
import { useField, Button, TextInput, FieldLabel, useFormFields, useForm } from "@payloadcms/ui";
import { Props } from "./type";

/**
 * ### SlugComponent
 *
 * This component is used to create a slug field in the Payload CMS.
 * It listens to changes in a specified field and formats the value into a slug.
 * It also provides a lock button to prevent changes to the slug.
 */

export const SlugComponent: React.FC<Props> = ({
	field,
	fieldToUse,
	checkboxFieldPath: checkboxFieldPathFromProps,
	path,
	readOnly: readOnlyFromProps
}) => {
	const { label } = field;
	const checkboxFieldPath = path?.includes(".") ? `${path}.${checkboxFieldPathFromProps}` : checkboxFieldPathFromProps;
	const { value, setValue } = useField<string>({ path: path || field.name });
	const { dispatchFields } = useForm();
	// The value of the checkbox
	// We're using separate useFormFields to minimise re-renders
	const checkboxValue = useFormFields(([fields]) => {
		return fields[checkboxFieldPath]?.value as string;
	});
	// The value of the field we're listening to for the slug
	const targetFieldValue = useFormFields(([fields]) => {
		return fields[fieldToUse]?.value as string;
	});

	useEffect(() => {
		if (checkboxValue) {
			if (targetFieldValue) {
				const formattedSlug = formatSlug(targetFieldValue);

				if (value !== formattedSlug) setValue(formattedSlug);
			} else {
				if (value !== "") setValue("");
			}
		}
	}, [targetFieldValue, checkboxValue, setValue, value]);

	const handleLock = useCallback(
		(e: React.MouseEvent) => {
			e.preventDefault();

			dispatchFields({
				type: "UPDATE",
				path: checkboxFieldPath,
				value: !checkboxValue
			});
		},
		[checkboxValue, checkboxFieldPath, dispatchFields]
	);

	const readOnly = readOnlyFromProps || checkboxValue;

	return (
		<div className="[ too-col ][ too-field-gap ]">
			<div className="[ too-row ]">
				<FieldLabel htmlFor={`field-${path}`} label={label} />
				<Button className="[ too-no-margin ]" buttonStyle="none" onClick={handleLock}>
					{checkboxValue ? "Unlock" : "Lock"}
				</Button>
			</div>
			<TextInput value={value} onChange={setValue} path={path || field.name} readOnly={Boolean(readOnly)} />
		</div>
	);
};
