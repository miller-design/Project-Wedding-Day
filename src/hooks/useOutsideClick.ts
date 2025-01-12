import { useEffect } from "react";

/**
 * Hook that detects and tracks clicks outside of a specified DOM element.
 * It returns a boolean indicating whether a click occurred outside the element.
 * Useful for closing dropdowns, modals, or other overlays when clicking outside.
 *
 * @param  ref (eg: ref.current)
 */

interface OutsideClickHandlerProps {
	ref: React.RefObject<HTMLElement>;
	handler: () => void;
}

const useOutsideClick = ({ ref, handler }: OutsideClickHandlerProps) => {
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (ref.current && !ref.current.contains(event.target as Node)) {
				handler();
			}
		};

		document.addEventListener("mousedown", handleClickOutside);

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [ref, handler]);
};

export { useOutsideClick };
