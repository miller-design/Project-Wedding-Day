import { useEffect, useRef } from "react";

export const useIsMounted = () => {
	const isMountRef = useRef(false);

	useEffect(() => {
		isMountRef.current = true;
	}, []);

	return isMountRef.current;
};
