import { ButtonGroupProps } from "./type";

const ButtonGroup: React.FC<ButtonGroupProps> = ({ children }) => {
	return <div className="[ TooButtonGroup ][ flex gap-[5px] rounded-md ]">{children}</div>;
};

export { ButtonGroup };
