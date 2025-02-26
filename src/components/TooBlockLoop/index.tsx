import { Fragment } from "react";

import dynamic from "next/dynamic";

import { getImageRatioInfo } from "@/lib/utils";

import type {
	Carousel,
	FAQS,
	FormAndText,
	FullscreenHero,
	ImageAndText,
	ImageCTA,
	Media,
	TextOnlyHero
} from "@/payload-types";

import { TooImageProps } from "../TooImage/type";
import { AccordionProps } from "../UI/Accordion/type";
import { Wysiwyg } from "../Wysiwg";
import { RichTextContent } from "../Wysiwg/type";
import { TooBlockHandler, TooBlockLoopProps } from "./type";

const ImageAndText = dynamic(() => import("../ImageAndText").then((mod) => mod.ImageAndText));
const Carousel = dynamic(() => import("../Carousel").then((mod) => mod.Carousel));
const FullScreenHero = dynamic(() => import("../Hero").then((mod) => mod.FullScreenHero));
const ImageCTA = dynamic(() => import("../ImageCTA").then((mod) => mod.ImageCTA));
const TextOnlyHero = dynamic(() => import("../Hero").then((mod) => mod.TextOnlyHero));
const FormAndText = dynamic(() => import("../FormAndText").then((mod) => mod.FormAndText));
const Faqs = dynamic(() => import("../Faqs").then((mod) => mod.Faqs));

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
		const mediaProps = createMediaProps(block.media_upload as Media, [100, 50], false, true);
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
					const media = slide.media_upload as Media;
					const { orientation } = getImageRatioInfo(media?.width as number, media?.height as number);
					let imageSizes: number[] = [];

					if (orientation === "landscape") {
						imageSizes = [100, 80, 50];
					} else if (orientation === "portrait") {
						imageSizes = [50, 40, 30];
					} else {
						imageSizes = [60, 50, 40];
					}

					const mediaProps = createMediaProps(media, imageSizes, false, true);
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
		const mediaProps = createMediaProps(block.media_upload as Media, [100, 50], false, true);
		if (!mediaProps) return null;
		const blockData = {
			label: block.label,
			header: block.header,
			media: mediaProps as TooImageProps,
			link: block.link
		};
		return (
			<Fragment key={i}>
				<ImageCTA {...blockData} />
			</Fragment>
		);
	};

	const handleFormAndText: TooBlockHandler<FormAndText> = (block, i) => {
		const blockContent = block.content ? block.content : undefined;

		return (
			<Fragment key={i}>
				<FormAndText content={blockContent} />
			</Fragment>
		);
	};

	const handleFaqList: TooBlockHandler<FAQS> = (block, i) => {
		const listItems: AccordionProps[] = [];

		block.questions?.map((item) => {
			if (!item.question) return;
			return listItems.push({
				title: item.question,
				children: <Wysiwyg content={item.answer as RichTextContent} />
			});
		});

		return (
			<Fragment key={i}>
				<Faqs items={listItems} />
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
					case "formAndText":
						return handleFormAndText(block, i);
					case "faqs":
						return handleFaqList(block, i);
					default:
						return null;
				}
			})}
		</>
	);
};

export { TooBlockLoop };
