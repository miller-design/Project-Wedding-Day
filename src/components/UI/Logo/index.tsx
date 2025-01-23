"use client";

import { useEffect, useState } from "react";

import Link from "next/link";

import clsx from "clsx";

import { LogoProps } from "./type";

const Logo: React.FC<LogoProps> = ({ isStatic, className = "" }) => {
	const [isScrolled, setIsScrolled] = useState(false);

	useEffect(() => {
		if (isStatic) {
			return;
		}

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
	}, [isStatic]);

	return (
		<div
			className={clsx([
				"[ TooLogo ][ too-secondary too-fs-24-30 !tracking-wider ]",
				!isStatic ? "[ fixed left-20-30 z-10 ][ origin-[left_center] ][ transition-transform duration-[400ms] ]" : "",
				!isStatic ? "[ text-white mix-blend-difference ]" : "[ text-black ]",
				!isStatic ? (isScrolled ? "scale-[0.75]" : "scale-[1]") : "",
				!isStatic ? (isScrolled ? "[ translate-y-10 translate-x-20-30 ]" : "[ translate-y-20-30 ]") : "",
				className
			])}
		>
			<Link href={"/"} className="[ ease-out duration-[400ms] transition-opacity hover:opacity-40 ]">
				J&P
			</Link>
		</div>
	);
};

export { Logo };
