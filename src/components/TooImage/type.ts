/**
 * Props for the TooImage component.
 *
 * This type defines the properties required to render an image with specific dimensions,
 * responsive sizes, and loading priorities.
 */

export type TooImageProps = {
	/** The image object containing source and alternative text. */
	image: {
		/** The source URL of the image. */
		src: string;
		/** The alternative text for the image. */
		alt: string;
	};
	/** The width of the image in pixels. */
	width: number;
	/** The height of the image in pixels. */
	height: number;
	/** An array of responsive sizes for the image. */
	sizes: number[];
	/** Indicates if the image should be loaded with high priority. */
	priority: boolean;
	/** Optional quality setting for the image. */
	q?: number;
	/** Optional flag to indicate if the image should maintain intrinsic dimensions. */
	intrinsic?: boolean;
	className?: string;
	blur?: boolean;
};
