import { useEffect } from "react";

/**
 * `useLockBodyScroll` is a hook to lock the scrolling of the body, typically used in modals and overlays.
 * It prevents the background content from scrolling when the modal or overlay is active.
 *
 * @param lock - (Optional) A boolean indicating whether to lock the body scroll. Defaults to true.
 */

const useLockBodyScroll = (lock: boolean = true) => {
	useEffect(() => {
		// dont run on the server
		if (typeof document === "undefined") {
			return;
		}
		const body = document.body;
		const bodyOriginalStyle = window.getComputedStyle(body).overflow;

		if (lock) {
			body.style.overflow = "hidden";
			body.style.height = "100vh"; // fallback incase dvh is not supported
			body.style.height = "100dvh";
		} else {
			body.style.overflow = bodyOriginalStyle;
			body.style.height = "";
		}

		return () => {
			if (lock) {
				body.style.overflow = bodyOriginalStyle;
				body.style.height = "";
			}
		};
	}, [lock]);
};

export { useLockBodyScroll };
