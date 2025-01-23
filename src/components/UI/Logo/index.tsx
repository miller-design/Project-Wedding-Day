"use client";

import { useEffect, useState } from "react";

import clsx from "clsx";

const Logo = () => {
	const [isScrolled, setIsScrolled] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			if (window.scrollY > 10) {
				setIsScrolled(true);
			} else {
				setIsScrolled(false);
			}
		};

		window.addEventListener("scroll", handleScroll);
		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);

	return (
		<div
			className={clsx([
				"[ TooLogo ][ too-secondary too-fs-24-30 !tracking-wider ][ text-white mix-blend-difference ]",
				"[ fixed left-20-30 z-10 ][ origin-[left_center] ][ transition-transform duration-[400ms] ]",
				isScrolled ? "scale-[0.75]" : "scale-[1]",
				isScrolled ? "[ translate-y-10 translate-x-20-30 ]" : "[ translate-y-20-30 ]"
			])}
		>
			J&P
		</div>
	);
};

export { Logo };
