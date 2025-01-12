/**
 * Props for the TooVideo component.
 *
 * This type defines the properties required to render a video with specific dimensions,
 * poster image, background player option, and viewport fitting.
 */

export type Props = {
	/** The source URL of the video. */
	src: string;
	/** The source URL of the poster image. */
	poster?: string;
	/** Whether the video should be played in the background. */
	bgPlayer?: boolean;
	/** The width of the video. */
	width?: number;
	/** The height of the video. */
	height?: number;
	/** Whether the video should fit the viewport. */
	fitViewport?: boolean;
};
