import { Fragment } from "react";

import dynamic from "next/dynamic";

import type { Carousel, FullscreenHero, ImageAndText, ImageCTA, Media, TextOnlyHero } from "@/payload-types";

import { TooImageProps } from "../TooImage/type";
import { RichTextContent } from "../Wysiwg/type";
import { TooBlockHandler, TooBlockLoopProps } from "./type";

const ImageAndText = dynamic(() => import("../ImageAndText").then((mod) => mod.ImageAndText));
const Carousel = dynamic(() => import("../Carousel").then((mod) => mod.Carousel));
const FullScreenHero = dynamic(() => import("../Hero").then((mod) => mod.FullScreenHero));
const ImageCTA = dynamic(() => import("../ImageCTA").then((mod) => mod.ImageCTA));
const TextOnlyHero = dynamic(() => import("../Hero").then((mod) => mod.TextOnlyHero));

const TooBlockLoop: React.FC<TooBlockLoopProps> = ({ blocks }) => {
	const createMediaProps = (media: Media | null, sizes: number[], priority: boolean, intrinsic: boolean) => {
		if (!media || typeof media !== "object") {
			console.warn(`media_upload is not an object:`, media);
			return null; // or handle the undefined case appropriately
		}
		return {
			image: {
				src: media.url,
				alt: media.alt
			},
			width: media.width,
			height: media.height,
			sizes,
			priority,
			intrinsic
		};
	};

	const handleFullScreenHero: TooBlockHandler<FullscreenHero> = (block, i) => {
		const mediaProps = createMediaProps(block.media_upload as Media, [100], true, false);
		if (!mediaProps) return null;
		const blockData = {
			label: block.label,
			title: block.title,
			message: block.message,
			media: mediaProps as TooImageProps
		};
		return (
			<Fragment key={i}>
				<FullScreenHero {...blockData} />
			</Fragment>
		);
	};

	const handleTextOnlyHero: TooBlockHandler<TextOnlyHero> = (block, i) => {
		const blockData = {
			label: block.label,
			title: block.title,
			message: block.message
		};
		return (
			<Fragment key={i}>
				<TextOnlyHero {...blockData} />
			</Fragment>
		);
	};

	const handleImageAndText: TooBlockHandler<ImageAndText> = (block, i) => {
		const mediaProps = createMediaProps(block.media_upload as Media, [100, 50], false, false);
		if (!mediaProps) return null;
		const blockData = {
			layout: block.layout,
			content: block.content as RichTextContent,
			media: mediaProps as TooImageProps
		};
		return (
			<Fragment key={i}>
				<ImageAndText {...blockData} />
			</Fragment>
		);
	};

	const handleCarousel: TooBlockHandler<Carousel> = (block, i) => {
		if (block.slider && block.slider.length > 0) {
			const slides = block.slider
				.map((slide) => {
					const mediaProps = createMediaProps(slide.media_upload as Media, [100, 50], false, true);
					return mediaProps as TooImageProps | null;
				})
				.filter((slide): slide is TooImageProps => slide !== null); // Type guard to filter out null values

			return (
				<Fragment key={i}>
					<Carousel slides={slides} />
				</Fragment>
			);
		}
		return null;
	};

	const handleImageCTA: TooBlockHandler<ImageCTA> = (block, i) => {
		const mediaProps = createMediaProps(block.media_upload as Media, [100, 50], false, false);
		if (!mediaProps) return null;
		const blockData = {
			label: block.label,
			header: block.header,
			media: mediaProps as TooImageProps
		};
		return (
			<Fragment key={i}>
				<ImageCTA {...blockData} />
			</Fragment>
		);
	};

	return (
		<>
			{blocks?.map((block, i) => {
				const blockType = block.blockType;
				switch (blockType) {
					case "fullscreenHero":
						return handleFullScreenHero(block, i);
					case "textonlyhero":
						return handleTextOnlyHero(block, i);
					case "image_and_text":
						return handleImageAndText(block, i);
					case "carousel":
						return handleCarousel(block, i);
					case "imagecta":
						return handleImageCTA(block, i);
					default:
						return null;
				}
			})}
		</>
	);
};

export { TooBlockLoop };
