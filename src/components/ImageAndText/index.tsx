import clsx from "clsx";

import { TooImage } from "../TooImage";
import { Wysiwyg } from "../Wysiwg";
import { ImageAndTextProps } from "./type";

const ImageAndText: React.FC<ImageAndTextProps> = ({ media, layout, content }) => {
	const outputMedia = () => {
		return <TooImage {...media} className="[ w-full h-full aspect-square object-cover object-center" />;
	};

	const getClassNames = (isFirst: boolean, layout: "layoutA" | "layoutB") => {
		const baseClasses = "[ rounded-xl overflow-hidden ][ col-span-full sm:col-span-6 ]";
		let layoutClasses = "[ sm:row-start-1 ]";
		let gridPosition;

		layoutClasses = isFirst ? "too-col items-center justify-center bg-gray-100 h-full p-[10%] sm:p-[15%]" : "";

		if (layout === "layoutA") {
			gridPosition = isFirst ? "sm:col-start-1 sm:col-end-7" : " sm:col-start-7 sm:col-span-6";
		} else if (layout === "layoutB") {
			gridPosition = isFirst
				? "sm:row-start-1 sm:row-end-1 sm:col-start-7 sm:col-end-13"
				: "sm:row-start-1 sm:row-end-1 sm:col-start-1 sm:col-end-7";
		}

		return clsx([baseClasses, gridPosition, layoutClasses]);
	};

	return (
		<section className="[ TooImageAndText ][ col-span-full ][ too-col ]">
			<div className={"[ too-grid-inner items-center ]"}>
				<div className={getClassNames(true, layout)}>
					<Wysiwyg content={content} />
				</div>
				<div className={getClassNames(false, layout)}>{media && outputMedia()}</div>
			</div>
		</section>
	);
};

export { ImageAndText };
