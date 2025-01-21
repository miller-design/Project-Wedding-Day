import { Page } from "@/payload-types";

import { TooImageProps } from "../TooImage/type";

export type ImageCTAProps = {
	media: TooImageProps;
	label: string | null | undefined;
	header: string | null | undefined;
	link?: {
		link_type?: ("internal" | "external") | null;
		url?: string | null;
		page?: (number | null) | Page;
	};
};