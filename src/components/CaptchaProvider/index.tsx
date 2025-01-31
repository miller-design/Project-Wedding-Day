"use client";

import { ReactNode, useEffect, useState } from "react";

import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";

interface CaptchaProviderProps {
	children: ReactNode;
}

const CaptchaProvider: React.FC<CaptchaProviderProps> = ({ children }) => {
	const [recaptchaKey, setRecaptchaKey] = useState<string | undefined>(undefined);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		setRecaptchaKey(process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY);
		setIsLoading(false);
	}, []);

	if (isLoading) {
		return null; // Or a loading spinner
	}

	if (!recaptchaKey) {
		console.error("NEXT_PUBLIC_RECAPTCHA_SITE_KEY is not defined in environment variables");
		return null; // Or some fallback UI
	}

	return (
		<GoogleReCaptchaProvider
			reCaptchaKey={recaptchaKey}
			scriptProps={{
				async: false,
				defer: false,
				appendTo: "head",
				nonce: undefined
			}}
		>
			{children}
		</GoogleReCaptchaProvider>
	);
};

export { CaptchaProvider };
