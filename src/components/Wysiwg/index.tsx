import { RichText } from "@payloadcms/richtext-lexical/react";

import { WysiwygProps } from "./type";

const Wysiwyg: React.FC<WysiwygProps> = ({ content }) => {
	return (
		<div className="[ TooWysiwyg ]">
			<RichText data={content} className="[ too-col gap-10-20 ]" />
		</div>
	);
};

export { Wysiwyg };
