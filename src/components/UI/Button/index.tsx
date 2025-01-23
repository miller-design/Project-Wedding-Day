import Link from "next/link";

import clsx from "clsx";

import { ButtonProps } from "./type";

const Button: React.FC<ButtonProps> = ({ text, isLink, link, isDisabled, onClick, isLight }) => {
	const styles = clsx([
		"TooButton",
		"px-10-20 py-10",
		"rounded-md overflow-hidden",
		"uppercase",
		"too-primary too-fs-12",
		"ease-out duration-[200ms]",
		isLight ? "backdrop-blur-md text-black" : "bg-black text-white hover:bg-black/4"
	]);

	const innerStyles = clsx([
		"too-abs-xy w-full h-full",
		"bg-[hsla(0,_0%,_80%,_.35)] ease-out duration-[400ms] transition-all",
		"hover:bg-[hsla(0,_0%,_80%,_.8)]"
	]);

	if (!isLink) {
		return (
			<button disabled={isDisabled} onClick={onClick} className={styles}>
				{isLight && <span className={innerStyles}></span>}
				<span className="[ relative z-[1] pointer-events-none ]">{text}</span>
			</button>
		);
	} else if (isLink && link?.href) {
		const { href, title, target, download, rel } = link;

		return (
			<Link href={href} title={title} target={target} download={download} rel={rel} className={styles}>
				{isLight && <span className={innerStyles}></span>}
				<span className="[ relative z-[1] pointer-events-none ]">{text}</span>
			</Link>
		);
	}
};

export { Button };
