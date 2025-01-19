export type ButtonProps = {
	text: string;
	isLink: boolean;
	link?: {
		href: string;
		title: string;
		target?: "_blank" | "_self" | "_parent" | "_top" | undefined;
		download?: string | undefined;
		rel?: "noopener" | "noreferrer" | "nofollow" | undefined;
	};
	isDisabled?: boolean;
	isLight?: boolean;
	onClick?: () => void;
};
