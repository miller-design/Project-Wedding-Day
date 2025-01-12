"use client";

import { useRef } from "react";

import Image from "next/image";

import { createImageSrcSizes, getImageRatio, getRatioFallback } from "@/lib/utils";

import { Props } from "./type";

/**
 * ### TooImage Component
 *
 * This component uses the Next.js Image component to display images in this Next.js project.
 *
 * @see {@link https://nextjs.org/docs/api-reference/next/image Image}
 */
const TooImage: React.FC<Props> = ({ image, width, height, sizes, priority, q = 95, intrinsic = true }) => {
	const imgSizes = createImageSrcSizes(sizes);
	const imgRatio = getImageRatio(width, height);
	const ratioFallback = getRatioFallback(width, height);
	const ref = useRef<HTMLImageElement | null>(null);

	const handleImageLoad = () => {
		if (!ref.current) return;

		ref.current.classList.add("lazyloaded");
	};

	if (intrinsic) {
		return (
			<div
				className="[ TooImage ][ too-intrinsic ]"
				style={{
					[`--img-ratio` as string]: imgRatio,
					[`--img-ratio-fallback` as string]: ratioFallback
				}}
			>
				<Image
					ref={ref}
					src={image?.src}
					alt={image?.alt}
					width={width}
					height={height}
					sizes={imgSizes}
					priority={priority}
					quality={q}
					onLoad={handleImageLoad}
					className="[ lazy ]"
				/>
			</div>
		);
	} else {
		return (
			<Image
				src={image?.src}
				alt={image?.alt}
				width={width}
				height={height}
				sizes={imgSizes}
				priority={priority}
				className="[ w-full ][ block ]"
				quality={q}
			/>
		);
	}
};

export { TooImage };
