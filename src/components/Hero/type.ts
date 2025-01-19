import { TooImageProps } from "../TooImage/type";

type defaultProps = {
	label?: string | null | undefined;
	title?: string | null | undefined;
	message?: string | null | undefined;
};

export type FullScreenHeroProps = defaultProps & {
	media: TooImageProps;
};

export type TextOnlyHeroProps = defaultProps;
