import type { Metadata } from "next";

import { TooBlockLoop } from "@/components/TooBlockLoop";

import { queryBySlug } from "@/lib/Payload/queries";

import { Page as PageType } from "@/payload-types";

import { Args } from "./type";

/**
 * Type guard function to determine if a given object is of type PageType.
 * This function checks that the object is not null and has a 'title' property of type string.
 * The presence of the 'title' property is used as an indicator that the object is a PageType,
 * as 'title' is a required property for PageType objects.
 */
const isPageType = (page: Partial<PageType> | null): page is PageType => {
	return page !== null && typeof page?.title === "string";
};

/**
 * This function generates metadata for a page based on its slug. It queries the Payload CMS for a page with the given slug,
 * and if found, returns the page's metadata including title and description. If no page is found, it returns an empty object.
 */
export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
	const { slug } = await paramsPromise;
	const page = await queryBySlug({ collection: "pages", slug: slug });

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
	const { slug } = await paramsPromise;
	const page = await queryBySlug({ collection: "pages", slug: slug });

	if (!isPageType(page)) {
		return <></>;
	}

	const { hero, content } = page;
	const blocks = [...(hero?.blocks ?? []), ...(content?.blocks ?? [])];

	return (
		<article className="[ min-h-screen ]">
			<div className="[ too-grid too-row-gap ]">
				<TooBlockLoop blocks={blocks} />
			</div>
		</article>
	);
};

export default Page;
