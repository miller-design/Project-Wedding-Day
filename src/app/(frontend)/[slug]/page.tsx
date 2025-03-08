import type { Metadata } from "next";

import { CaptchaProvider } from "@/components/CaptchaProvider";
import { TooBlockLoop } from "@/components/TooBlockLoop";

import { queryBySlug, queryGlobal } from "@/lib/Payload/queries";

import { Args } from "./type";
import { isPageType } from "@/lib/utils";
import { hasCookie } from "cookies-next";
import { cookies } from "next/headers";
import { Media } from "@/payload-types";
import { LoginForm } from "@/components/UI/Forms";

/**
 * This function generates metadata for a page based on its slug. It queries the Payload CMS for a page with the given slug,
 * and if found, returns the page's metadata including title and description. If no page is found, it returns an empty object.
 */
export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
	const { slug } = await paramsPromise;
	const effectiveSlug = slug ?? "home";
	const page = await queryBySlug({ collection: "pages", slug: effectiveSlug });

	if (isPageType(page)) {
		const { meta } = page;
		return {
			title: meta?.title,
			description: meta?.description
		};
	} else {
		return {};
	}
}

/**
 * This function dynamically loads the content of a page based on its slug. It takes the page's slug as a parameter,
 * queries the Payload CMS for the page content, and returns a JSX component representing the page.
 */
const Page = async ({ params: paramsPromise }: Args) => {
	const allowAccess = await hasCookie("jp_allow_access", { cookies });
	const { slug } = await paramsPromise;
	const effectiveSlug = slug ?? "home";

	if(allowAccess) {
		const page = await queryBySlug({ collection: "pages", slug: effectiveSlug });

		if (!isPageType(page)) {
			return <></>;
		}

		const { hero, content } = page;
		const blocks = [...(hero?.blocks || []), ...(content?.blocks || [])];

		return (
			<article className="[ min-h-screen ][ mb-20-30 ]">
				{blocks.length > 0 && (
					<div className="[ too-grid too-row-gap ]">
						<CaptchaProvider>
							<TooBlockLoop blocks={blocks} />
						</CaptchaProvider>
					</div>
				)}
			</article>
		);
	} else {
		const globals = await queryGlobal();
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
			<CaptchaProvider>
				<LoginForm password={weddingPW} bg={weddingBgProps} />
			</CaptchaProvider>
		)
	}
};

export default Page;
