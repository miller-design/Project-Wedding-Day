import { useEffect, useState } from "react";

/**
 * Custom hook for detecting when an element enters the viewport
 * @param threshold - A number between 0 and 1 indicating the percentage of the target's visibility the observer's callback should be executed. Can also be an array of numbers.
 * @returns A tuple containing [ref setter function, boolean indicating if element is in view]
 * @example
 * const [ref, isInView] = useIntersectionObserver(0.5);
 * // Use with a single ref
 * <div ref={ref}>
 *   {isInView && <span>Element is in view!</span>}
 * </div>
 */
const useIntersectionObserver = (threshold: number | number[] = 0) => {
	const [ref, setRef] = useState<Element | null>(null);
	const [isIntersecting, setIsIntersecting] = useState(false);

	useEffect(() => {
		if (!ref) return;

		const observer = new IntersectionObserver(
			(entries) => {
				const entry = entries[0];
				if (entry.isIntersecting) {
					setIsIntersecting(true);
					observer.disconnect();
				}
			},
			{
				threshold,
				root: null,
				rootMargin: "0px"
			}
		);

		observer.observe(ref);
		return () => observer.disconnect();
	}, [ref, threshold]);

	return [setRef, isIntersecting] as const;
};

export default useIntersectionObserver;
