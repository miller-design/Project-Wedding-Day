"use client";

import { Fragment, useEffect, useState } from "react";

import { usePathname } from "next/navigation";

import clsx from "clsx";

import { PageLinks, RsvpLink } from "@/lib/menus";

import { Button } from "../UI/Button";
import { ButtonGroup } from "../UI/ButtonGroup";
import { Logo } from "../UI/Logo";
import { HeaderProps } from "./type";

const Header: React.FC<HeaderProps> = ({ isLocked }) => {
	const [isScrolled, setIsScrolled] = useState(false);
	const [mobileActive, setMobileActive] = useState(false);
	const [isMobile, setIsMobile] = useState(true);
	const pathname = usePathname();

	const toggleMobileActive = () => {
		setMobileActive((prev) => !prev);
	};

	const activeMobileClass =
		"transition-all duration-[400ms] ease absolute top-80-90 opacity-1 pointer-auto translate-y-[0]";
	const baseMobileClasses =
		"transition-all duration-[400ms] ease absolute top-80-90 opacity-0 pointer-none -translate-y-[5px]";

	const menuTrigger = {
		text: "Menu",
		isLink: false,
		isLight: true
	};

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

	useEffect(() => {
		const checkMobile = () => {
			if (mobileActive) {
				setMobileActive(false);
			}
			setIsMobile(window.innerWidth < 900); // 640px is the default Tailwind 'sm' breakpoint
		};
		// Check initially
		checkMobile();
		// Add resize listener
		window.addEventListener("resize", checkMobile);
		// Cleanup
		return () => {
			window.removeEventListener("resize", checkMobile);
		};
	}, []);

	useEffect(() => {
		setMobileActive(false);
	}, [pathname]);

	return (
		<>
			<header
				className={`[ TooHeader ][ too-fixed z-10 ][ transition-[padding] duration-[400ms] ] ${
					isScrolled ? "[ py-10 px-20-30 ]" : "[ py-20-30 ]"
				}`}
			>
				<div className="[ too-grid items-center ][ rounded-xl ]">
					{!isLocked && (
						<>
							<div className="[ col-span-2 sm:col-span-3 md:col-span-4 ]"></div>
							<div className="[ flex justify-center items-center ][ col-span-2 sm:col-span-6 md:col-span-4 ]">
								{isMobile && <Button {...menuTrigger} onClick={toggleMobileActive} />}
								<ButtonGroup className={clsx([isMobile ? (mobileActive ? activeMobileClass : baseMobileClasses) : ""])}>
									{PageLinks.map((link, i) => (
										<Fragment key={i}>
											<Button {...link} />
										</Fragment>
									))}
								</ButtonGroup>
							</div>
							<div className="[ flex justify-end items-center ][ col-span-2 sm:col-span-3 md:col-span-4 ]">
								<Button {...RsvpLink} />
							</div>
						</>
					)}
				</div>
			</header>
			<Logo className="top-[4px] sm:top-[3px]" />
		</>
	);
};

export { Header };
