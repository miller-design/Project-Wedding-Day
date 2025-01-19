import { TooImageProps } from "../TooImage/type";
import { RichTextContent } from "../Wysiwg/type";

export type ImageAndTextProps = {
	layout: "layoutA" | "layoutB";
	header: string | null | undefined;
	content: RichTextContent;
	media: TooImageProps;
};
