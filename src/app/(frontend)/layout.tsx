import type { Metadata } from "next";

import clsx from "clsx";
import { Provider } from "jotai";

import "@/styles/app.scss";

import { geistMono, geistSans } from "@/lib/fonts";

export const metadata: Metadata = {
	title: "J&P - Save the Date",
	description: "Join us in celebrating Paige and Jack's wedding day. Save the date!"
};

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<Provider>
				<body className={clsx(geistSans.variable, geistMono.variable, "antialiased")}>
					<main className="[ too-col ][ min-h-screen ]">{children}</main>
				</body>
			</Provider>
		</html>
	);
}
