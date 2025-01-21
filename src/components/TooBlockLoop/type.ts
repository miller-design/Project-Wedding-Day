import { JSX } from "react";

import { Carousel, FullscreenHero, ImageAndText, ImageCTA, Quotes, TextOnlyHero } from "@/payload-types";

// Define TooBlockHandler function as a generic type
export type TooBlockHandler<T> = (block: T, index: number) => JSX.Element | null;
// Define a generic type for block handlers
export type BlockTypes = FullscreenHero | TextOnlyHero | ImageCTA | Carousel | ImageAndText | Quotes;
// Use the reusable type alias
export type TooBlockLoopProps = {
	blocks?: BlockTypes[] | null;
};
