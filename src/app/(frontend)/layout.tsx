import type { Metadata } from "next";

import clsx from "clsx";
import { Provider } from "jotai";

import "@/styles/app.scss";

import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { SmoothScroll } from "@/components/SmoothScroll";
import { LoginForm } from "@/components/UI/Forms";

import { bodoniModa, poppins } from "@/lib/fonts";
import { queryGlobal } from "@/lib/Payload/queries";

export async function generateMetadata(): Promise<Metadata> {
	const globals = await queryGlobal();

	return {
		metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
		title: globals?.meta_title,
		description: globals?.meta_title,
		icons: {
			icon: ["/favicon/favicon.ico", "/favicon/apple-icon.png", "/favicon/icon.png", "/favicon/icon.svg"]
		},
		openGraph: {
			title: "Jack & Paige's Wedding",
			description:
				"Join us for our special day! Find all the details about our wedding celebration, including venue information, schedule, and accommodation details.",
			images: [
				{
					url: "/OG-image.png",
					width: 1600,
					height: 1200,
					alt: "Jack and Paige wedding website"
				}
			]
		},
		twitter: {
			card: "summary_large_image",
			title: "Jack & Paige's Wedding",
			description:
				"Join us for our special day! Find all the details about our wedding celebration, including venue information, schedule, and accommodation details.",
			images: ["/OG-image.png"]
		}
	};
}

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode;
}>) {
	const allowAccess = false;

	return (
		<html lang="en">
			<Provider>
				<body className={clsx(bodoniModa.variable, poppins.variable, "antialiased")}>
					{allowAccess ? (
						<>
							<Header />
							<SmoothScroll>
								<main className="[ too-col ][ min-h-screen ]">{children}</main>
								<Footer />
							</SmoothScroll>
						</>
					) : (
						<>
							<Header isLocked={true} />
							<LoginForm />
						</>
					)}
				</body>
			</Provider>
		</html>
	);
}
