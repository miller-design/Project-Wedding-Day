"use client";

import clsx from "clsx";
import useEmblaCarousel from "embla-carousel-react";

import { TooImage } from "../TooImage";
import { CarouselProps } from "./type";

const Carousel: React.FC<CarouselProps> = ({ slides }) => {
	const options = {
		loop: false,
		containScroll: "keepSnaps" as const,
		dragFree: true
	};
	const slideStyles = "too-col rounded-xl overflow-hidden";
	const [emblaRef] = useEmblaCarousel(options);

	const getAspectRatioClass = (width: number, height: number) => {
		// Determine the flex-basis percentage based on the aspect ratio of the slide.
		// If the width and height are equal, it returns "flex-[0_0_50%]" for a square aspect ratio.
		// If the width is greater than the height, it returns "flex-[0_0_70%]" for a landscape aspect ratio.
		// Otherwise, it returns "flex-[0_0_35%]" for a portrait aspect ratio.
		if (width === height) return "flex-[0_0_80%] md:flex-[0_0_50%]";
		return width > height ? "flex-[0_0_100%] md:flex-[0_0_70%]" : "flex-[0_0_50%] md:flex-[0_0_35%]";
	};

	return (
		<section className="[ TooCarousel ][ col-span-full ][ w-full ]">
			<div className="[ too-grid-inner ]">
				<div className="[ col-span-full ]">
					<div className="[ embala ]" ref={emblaRef}>
						<div className="[ flex ][ too-site-padding ]">
							{slides.map((slide, index) => {
								const aspectClass = getAspectRatioClass(slide.width, slide.height);
								return (
									<div key={index} className={clsx([slideStyles, aspectClass, "mr-10-20"])}>
										<TooImage {...slide} className="h-full max-h-[calc(100vh-60px)] object-cover" />
									</div>
								);
							})}
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export { Carousel };
