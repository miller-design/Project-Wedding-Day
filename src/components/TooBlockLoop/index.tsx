import { Fragment } from "react";

import dynamic from "next/dynamic";

import { Media } from "@/payload-types";

import { Carousel } from "../Carousel";
import { ImageAndText } from "../ImageAndText";
import { TooImageProps } from "../TooImage/type";
import { RichTextContent } from "../Wysiwg/type";
import { TooBlockLoopProps } from "./type";

const FullScreenHero = dynamic(() => import("../Hero").then((mod) => mod.FullScreenHero));

const TooBlockLoop: React.FC<TooBlockLoopProps> = ({ blocks }) => {
	// image_and_text
	// carousel
	// imagecta
	// quotes

	// textonlyhero

	return (
		<>
			{blocks?.map((block, i) => {
				switch (block.blockType) {
					case "fullscreenHero":
						if (block) {
							const media = block.media_upload as Media;
							if (typeof media !== "object" || media === null) {
								console.warn(`media_upload is not an object for block:`, block);
								return null; // or handle the undefined case appropriately
							}
							const blockData = {
								label: block.label,
								title: block.title,
								message: block.message,
								media: {
									image: {
										src: media?.url,
										alt: media?.alt
									},
									width: media.width,
									height: media.height,
									sizes: [100],
									priority: true,
									intrinsic: false
								} as TooImageProps
							};
							return <Fragment key={i}>{<FullScreenHero {...blockData} />}</Fragment>;
						}

					case "image_and_text":
						if (block) {
							const media = block.media_upload as Media;
							if (typeof media !== "object" || media === null) {
								console.warn(`media_upload is not an object for block:`, block);
								return null; // or handle the undefined case appropriately
							}
							const blockData = {
								layout: block.layout,
								header: block.header,
								content: block.content as RichTextContent,
								media: {
									image: {
										src: media?.url,
										alt: media?.alt
									},
									width: media?.width,
									height: media?.height,
									sizes: [100, 50],
									priority: false,
									intrinsic: false
								} as TooImageProps
							};
							return <Fragment key={i}>{<ImageAndText {...blockData} />}</Fragment>;
						}

					case "carousel":
						if (block) {
							if (block.slider && block.slider.length > 0) {
								const slides = block.slider.map((slide) => {
									const media = slide.media_upload as Media;
									return {
										image: {
											src: media?.url,
											alt: media?.alt
										},
										width: media?.width,
										height: media?.height,
										sizes: [100, 50],
										priority: false,
										intrinsic: true
									} as TooImageProps;
								});
								return <Fragment key={i}>{<Carousel slides={slides} />}</Fragment>;
							}
						}

					default:
						return null;
				}
			})}
		</>
	);
};

export { TooBlockLoop };
