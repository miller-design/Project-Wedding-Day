"use client";

import { useEffect, useRef, useState } from "react";

import dynamic from "next/dynamic";

import clsx from "clsx";
import { useInView } from "react-intersection-observer";

import { getImageRatio, getRatioFallback } from "@/lib/utils";

import { Props } from "./type";

const ReactPlayer = dynamic(() => import("react-player/lazy"), { ssr: false });

/**
 * ### TooVideo Component
 *
 * This React component renders a video player using the ReactPlayer library.
 * It supports background video playback and can display a poster image when
 * the video is not playing. The component adjusts its size based on the
 * provided width and height, and it can fit the viewport if specified.
 */
const TooVideo: React.FC<Props> = ({ width = 0, height = 0, src, poster, bgPlayer, fitViewport }) => {
	/* eslint-disable  @typescript-eslint/no-explicit-any */
	const imgRatio = getImageRatio(width, height);
	const ratioFallback = getRatioFallback(width, height);
	// TODO - find a way to define this player type correctly
	const playerRef = useRef<any | null>(null);
	const [playState, setPlayState] = useState(false);
	const { ref, inView } = useInView({
		threshold: 0
	});

	useEffect(() => {
		if (inView) {
			if (bgPlayer && !playState) {
				setPlayState(true);
			}
		} else {
			if (bgPlayer && playState) {
				setPlayState(false);
			} else if (!bgPlayer && playerRef.current) {
				// This is the key to keeping the player in light mode
				playerRef.current.showPreview();
			}
		}
	}, [inView]);

	if (bgPlayer) {
		return (
			<div
				ref={ref}
				className={clsx("[ TooVideo ][ too-intrinsic ]", fitViewport ? "[ w-screen h-svh ][ relative ]" : "")}
				style={{
					[`--img-ratio` as string]: imgRatio,
					[`--img-ratio-fallback` as string]: ratioFallback
				}}
			>
				<ReactPlayer
					ref={playerRef}
					url={src}
					playing={playState}
					controls={false}
					muted={true}
					playsinline={true}
					loop={true}
					width="100vh"
					height="100svh"
				/>
			</div>
		);
	} else {
		return (
			<div
				ref={ref}
				className={`[ TooVideo ][ too-intrinsic ]`}
				style={{
					[`--img-ratio` as string]: imgRatio,
					[`--img-ratio-fallback` as string]: ratioFallback
				}}
			>
				<ReactPlayer
					ref={playerRef}
					url={src}
					light={poster}
					playing={true}
					controls={true}
					playsinline={true}
					width="100%"
					height="100%"
				/>
			</div>
		);
	}
};

export { TooVideo };
