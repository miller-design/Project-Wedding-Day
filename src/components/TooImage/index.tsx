"use client";

import { useRef } from "react";

import Image from "next/image";

import clsx from "clsx";

import { createImageSrcSizes, getImageRatio, getRatioFallback } from "@/lib/utils";

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
	className,
	blur = false
}) => {
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
				className={clsx(["[ TooImage ][ too-intrinsic ]", className])}
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
					className={blur ? "" : "[ lazy ]"}
					placeholder={blur ? "blur" : undefined}
					blurDataURL={
						blur
							? "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8UA8AAmUBcaVexNkAAAAASUVORK5CYII="
							: undefined
					}
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
				className={clsx(["[ TooImage ][ w-full ][ block ]", className])}
				quality={q}
				placeholder={blur ? "blur" : undefined}
				blurDataURL={
					blur
						? "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8UA8AAmUBcaVexNkAAAAASUVORK5CYII="
						: undefined
				}
			/>
		);
	}
};

export { TooImage };
