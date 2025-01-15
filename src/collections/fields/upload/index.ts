import type { Field } from "payload";

export const UploadField: Field = {
	name: "media_upload",
	label: "Media Upload",
	type: "upload",
	relationTo: "media"
};
