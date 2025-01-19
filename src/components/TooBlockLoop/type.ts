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

export type TooBlockLoopProps = {
	blocks?:
		| (FullscreenHero | TextOnlyHero | Title | ContentBlock | ImageCTA | Carousel | ImageAndText | Quotes)[]
		| null;
};
