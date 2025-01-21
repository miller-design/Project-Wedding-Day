import { ButtonGroupProps } from "./type";

const ButtonGroup: React.FC<ButtonGroupProps> = ({ children }) => {
	return <div className="[ TooButtonGroup ][ flex gap-[5px] rounded-lg ]">{children}</div>;
};

export { ButtonGroup };
