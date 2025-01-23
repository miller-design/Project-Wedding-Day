"use client";

import { ReactLenis } from "lenis/react";

import { SmoothScrollProps } from "./type";

const SmoothScroll: React.FC<SmoothScrollProps> = ({ children }) => {
	return (
		<ReactLenis root options={{ lerp: 0.1, duration: 1.5 }}>
			{children}
		</ReactLenis>
	);
};

export { SmoothScroll };
