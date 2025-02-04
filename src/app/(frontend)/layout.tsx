import type { Metadata } from "next";

import clsx from "clsx";
import { Provider } from "jotai";

import "@/styles/app.scss";

import { cookies } from "next/headers";

import { hasCookie } from "cookies-next/server";

import { CaptchaProvider } from "@/components/CaptchaProvider";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { SmoothScroll } from "@/components/SmoothScroll";
import { LoginForm } from "@/components/UI/Forms";

import { bodoniModa, poppins } from "@/lib/fonts";
import { queryGlobal } from "@/lib/Payload/queries";

import { Media } from "@/payload-types";

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

export default async function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode;
}>) {
	const globals = await queryGlobal();
	const allowAccess = await hasCookie("jp_allow_access", { cookies });
	const { password, lockscreen_bg } = globals;
	const weddingPW = password;
	const weddingBg = lockscreen_bg as Media;
	const weddingBgProps = {
		image: {
			src: weddingBg?.url as string,
			alt: weddingBg?.alt as string
		},
		width: weddingBg?.width,
		height: weddingBg?.height,
		sizes: [90],
		priority: true,
		intrinsic: false
	};

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
							<CaptchaProvider>
								<Header isLocked={true} />
								<LoginForm password={weddingPW} bg={weddingBgProps} />
							</CaptchaProvider>
						</>
					)}
				</body>
			</Provider>
		</html>
	);
}
