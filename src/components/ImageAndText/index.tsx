import clsx from "clsx";

import { TooImage } from "../TooImage";
import { Wysiwyg } from "../Wysiwg";
import { ImageAndTextProps } from "./type";

const ImageAndText: React.FC<ImageAndTextProps> = ({ media, layout, content }) => {
	const outputMedia = () => {
		return (
			<TooImage
				{...media}
				className="[ w-full h-full !aspect-square [&_img]:aspect-square [&_img]:object-cover [&_img]:object-center"
			/>
		);
	};

	const getClassNames = (isFirst: boolean, layout: "layoutA" | "layoutB") => {
		const baseClasses = "[ rounded-xl overflow-hidden ][ col-span-full md:col-span-6 ]";
		let layoutClasses = "[ md:row-start-1 ]";
		let gridPosition;

		layoutClasses = isFirst
			? "too-col items-center justify-center bg-gray-100 h-full p-[10%] sm:p-[15%] xxl:p-[25%]"
			: "";

		if (layout === "layoutA") {
			gridPosition = isFirst ? "md:col-start-1 md:col-end-7" : " md:col-start-7 md:col-span-6";
		} else if (layout === "layoutB") {
			gridPosition = isFirst
				? "md:row-start-1 md:row-end-1 md:col-start-7 md:col-end-13"
				: "md:row-start-1 md:row-end-1 md:col-start-1 md:col-end-7";
		}

		return clsx([baseClasses, gridPosition, layoutClasses]);
	};

	return (
		<section className="[ TooImageAndText ][ col-span-full ][ too-col ]">
			<div className={"[ too-grid-inner gap-y-10-20 items-center ]"}>
				<div className={getClassNames(true, layout)}>
					<Wysiwyg content={content} />
				</div>
				<div className={getClassNames(false, layout)}>{media && outputMedia()}</div>
			</div>
		</section>
	);
};

export { ImageAndText };
