import type { Metadata } from "next";

import clsx from "clsx";
import { Provider } from "jotai";

import "@/styles/app.scss";

import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { SmoothScroll } from "@/components/SmoothScroll";

import { bodoniModa, poppins } from "@/lib/fonts";

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
				<body className={clsx(bodoniModa.variable, poppins.variable, "antialiased")}>
					<Header />
					<SmoothScroll>
						<main className="[ too-col ][ min-h-screen ]">{children}</main>
						<Footer />
					</SmoothScroll>
				</body>
			</Provider>
		</html>
	);
}
