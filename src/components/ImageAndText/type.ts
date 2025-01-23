import { TooImageProps } from "../TooImage/type";
import { RichTextContent } from "../Wysiwg/type";

export type ImageAndTextProps = {
	layout: "layoutA" | "layoutB";
	content: RichTextContent;
	media: TooImageProps;
};
