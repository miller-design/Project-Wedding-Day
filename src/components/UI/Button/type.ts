export type ButtonTargetType = "_blank" | "_self" | "_parent" | "_top" | undefined;
export type TooLinkProps = {
	href: string;
	title: string;
	target?: ButtonTargetType;
	download?: string | undefined;
	rel?: "noopener" | "noreferrer" | "nofollow" | undefined;
};

export type ButtonProps = {
	text: string;
	isLink: boolean;
	link?: TooLinkProps;
	isDisabled?: boolean;
	isLight?: boolean;
	type?: "button" | "submit" | "reset";
	onClick?: () => void;
	className?: string;
};
