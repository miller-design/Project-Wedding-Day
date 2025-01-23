import { JSX } from "react";

import {
	Carousel,
	ContentBlock,
	FullscreenHero,
	ImageAndText,
	ImageCTA,
	Quotes,
	TextOnlyHero,
	Title
} from "@/payload-types";

// Define TooBlockHandler function as a generic type
export type TooBlockHandler<T> = (block: T, index: number) => JSX.Element | null;
// Define a generic type for block handlers
export type BlockTypes =
	| FullscreenHero
	| TextOnlyHero
	| ImageCTA
	| Carousel
	| ImageAndText
	| Quotes
	| Title
	| ContentBlock;
// Use the reusable type alias
export type TooBlockLoopProps = {
	blocks?: BlockTypes[] | null | undefined;
};
