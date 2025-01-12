import type { Metadata } from "next";
import dynamic from "next/dynamic";

import { queryBySlug } from "@/lib/Payload/queries";

import { Page as PageType } from "@/payload-types";

import { Args } from "./type";

/**
 * Dynamic import is used to import a module only when it is needed.
 * This can help reduce the initial load time of the application.
 */
const RichText = dynamic(() => import("@payloadcms/richtext-lexical/react").then((mod) => mod.RichText));

/**
 * Type guard function to determine if a given object is of type PageType.
 * This function checks that the object is not null and has a 'title' property of type string.
 * The presence of the 'title' property is used as an indicator that the object is a PageType,
 * as 'title' is a required property for PageType objects.
 */
const isPageType = (page: Partial<PageType> | null): page is PageType => {
	return page !== null && typeof page.title === "string";
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

	const { content } = page;

	return (
		<article>
			<div className="[ too-grid ][ items-center ][ my-auto ][ pt-150-160 pb-70-80 ]">
				<div className="[ too-col ][ col-start-1 -col-end-1 ]">
					<div className="[ too-col gap-y-10-20 ][ pb-40-50 ]">
						<h1 className="[ too-primary too-fs-48-66 ]">{page?.title}</h1>
						<p>This title is pulled from the Payload cms</p>
					</div>
					<hr />
				</div>
				<div className="[ too-col ][ col-start-1 -col-end-1 ][ pt-40-50 ]">
					{content?.blocks?.map((block, i) => {
						switch (block.blockType) {
							case "content":
								if (block.richText) {
									return (
										<div key={i}>
											<RichText data={block.richText} />
										</div>
									);
								}
							default:
								return null;
						}
					})}
				</div>
			</div>
		</article>
	);
};

export default Page;
