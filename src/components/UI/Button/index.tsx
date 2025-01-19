import Link from "next/link";

import clsx from "clsx";

import { ButtonProps } from "./type";

const Button: React.FC<ButtonProps> = ({ text, isLink, link, isDisabled, onClick, isLight }) => {
	const styles = clsx([
		"TooButton",
		"px-10-20 py-10",
		"rounded",
		"uppercase",
		"too-primary too-fs-12",
		"ease-out duration-[200ms]",
		isLight ? "backdrop-blur-md text-black hover:bg-white/15" : "bg-black text-white hover:bg-black/4"
	]);

	if (!isLink) {
		return (
			<button disabled={isDisabled} onClick={onClick} className={styles}>
				{text}
			</button>
		);
	} else if (isLink && link?.href) {
		const { href, title, target, download, rel } = link;

		return (
			<Link href={href} title={title} target={target} download={download} rel={rel} className={styles}>
				{text}
			</Link>
		);
	}
};

export { Button };
