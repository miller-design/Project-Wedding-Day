"use client";

import { useState } from "react";

import Image from "next/image";

import clsx from "clsx";

import { createImageSrcSizes, getImageRatio, getRatioFallback } from "@/lib/utils";

import useIntersectionObserver from "@/hooks/useIntersectionObserver";

import { TooImageProps } from "./type";

/**
 * ### TooImage Component
 *
 * This component uses the Next.js Image component to display images in this Next.js project.
 *
 * @see {@link https://nextjs.org/docs/api-reference/next/image Image}
 */
const TooImage: React.FC<TooImageProps> = ({
	image,
	width,
	height,
	sizes,
	priority,
	q = 95,
	intrinsic = true,
	className
}) => {
	const [imgLoaded, setImgLoaded] = useState(false);
	const imgSizes = createImageSrcSizes(sizes);
	const imgRatio = getImageRatio(width, height);
	const ratioFallback = getRatioFallback(width, height);
	const [ref, isInView] = useIntersectionObserver(0.33);

	const handleImageLoad = () => {
		setImgLoaded(true);
	};

	if (intrinsic) {
		return (
			<div
				className={clsx(["[ TooImage ][ too-intrinsic ]", className])}
				style={{
					[`--img-ratio` as string]: imgRatio,
					[`--img-ratio-fallback` as string]: ratioFallback
				}}
			>
				<Image
					src={image?.src}
					alt={image?.alt ?? ""}
					width={width}
					height={height}
					sizes={imgSizes}
					priority={priority}
					quality={q}
					className={clsx(["lazy", imgLoaded && isInView && "lazyloaded"])}
					onLoad={handleImageLoad}
					ref={ref}
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
				className={clsx(["[ TooImage ][ w-full ][ block ]", className, imgLoaded && isInView && "lazyloaded"])}
				quality={q}
				onLoad={handleImageLoad}
				ref={ref}
			/>
		);
	}
};

export { TooImage };
