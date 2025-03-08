import Page from "./[slug]/page";
import type { Metadata } from "next";

import { queryBySlug } from "@/lib/Payload/queries";

import { Args } from "./[slug]/type";
import { isPageType } from "@/lib/utils";


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

export default Page;
