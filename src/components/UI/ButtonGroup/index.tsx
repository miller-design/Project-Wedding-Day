import { ButtonGroupProps } from "./type";

const ButtonGroup: React.FC<ButtonGroupProps> = ({ children, className }) => {
	return <div className={`[ TooButtonGroup ][ flex gap-[5px] rounded-lg ] ${className}`}>{children}</div>;
};

export { ButtonGroup };
