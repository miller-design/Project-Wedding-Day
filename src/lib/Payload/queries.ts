import { cache } from "react";

import { draftMode } from "next/headers";

import configPromise from "@payload-config";
import { getPayload } from "payload";
import type { Config } from "src/payload-types";

type Collection = keyof Config["collections"];
type queryBySlugType = {
	/** set the collection you want to query eg: pages */
	collection: Collection;
	/** set the slug to query your collection by */
	slug: string | undefined;
};

/**
 * ### queryBySlug
 *
 * Executes a query on a specified collection to find the first document that matches the provided slug.
 * This function takes into account the draft mode and returns the first matching document or null if no match is found.
 *
 */

const queryGlobal = cache(async () => {
	const { isEnabled: draft } = await draftMode();
	const payload = await getPayload({ config: configPromise });
	const result = await payload.findGlobal({
		slug: "site-options",
		draft
	});

	return result;
});

/**
 * ### queryCollection
 *
 * Executes a query on a specified collection to fetch all documents.
 * This function takes into account the draft mode and returns all documents from the collection.
 */
const queryCollection = cache(async ({ collection }: { collection: Collection }) => {
	if (!collection) {
		return [];
	}

	const payload = await getPayload({ config: configPromise });
	const result = await payload.find({
		collection: collection,
		pagination: false
	});
	return result.docs;
});

export { queryBySlug, queryGlobal, queryCollection };

/**
 * ### queryBySlug
 *
 * Executes a query on a specified collection to find the first document that matches the provided slug.
 * This function takes into account the draft mode and returns the first matching document or null if no match is found.
 *
 */

const queryBySlug = cache(async ({ collection, slug }: queryBySlugType) => {
	if (!slug) {
		return null;
	}

	const { isEnabled: draft } = await draftMode();
	const payload = await getPayload({ config: configPromise });
	const result = await payload.find({
		collection: collection,
		draft,
		limit: 1,
		pagination: false,
		overrideAccess: draft,
		where: {
			slug: {
				equals: slug
			}
		}
	});
	return result.docs?.[0];
});
