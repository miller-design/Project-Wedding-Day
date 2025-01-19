import { RichText } from "@payloadcms/richtext-lexical/react";

import { WysiwygProps } from "./type";

const Wysiwyg: React.FC<WysiwygProps> = ({ content }) => {
	return (
		<div>
			<RichText data={content} />
		</div>
	);
};

export { Wysiwyg };
