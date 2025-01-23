"use client";

import { useEffect, useState } from "react";

import { Button } from "../UI/Button";
import { ButtonGroup } from "../UI/ButtonGroup";
import { Logo } from "../UI/Logo";

const Header = () => {
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
		<>
			<header
				className={`[ TooHeader ][ too-fixed z-10 ][ transition-[padding] duration-[400ms] ] ${
					isScrolled ? "[ py-10 px-20-30 ]" : "[ py-20-30 ]"
				}`}
			>
				<div className="[ too-grid items-center ][ rounded-xl ]">
					<div className="[ col-span-3 md:col-span-4 ]"></div>
					<div className="[ hidden sm:flex justify-center items-center ][ sm:col-span-6 md:col-span-4 ]">
						<ButtonGroup>
							<Button text="Our Story" isLink={false} isLight={true} />
							<Button text="Location" isLink={false} isLight={true} />
							<Button text="Faq's" isLink={false} isLight={true} />
						</ButtonGroup>
					</div>
					<div className="[ flex justify-end items-center ][ col-span-3 md:col-span-4 ]">
						<Button text="RSVP" isLink={false} isLight={true} />
					</div>
				</div>
			</header>
			<Logo />
		</>
	);
};

export { Header };
