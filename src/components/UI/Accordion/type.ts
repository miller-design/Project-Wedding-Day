export type AccordionProps = {
	title: string;
	children: React.ReactNode;
	isOpen?: boolean;
	onToggle?: () => void;
	className?: string;
};
