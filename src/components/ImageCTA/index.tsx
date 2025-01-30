import { Page } from "@/payload-types";

import { TooImage } from "../TooImage";
import { Button } from "../UI/Button";
import { ButtonTargetType } from "../UI/Button/type";
import { ImageCTAProps } from "./type";

const getLinkSlug = (link: ImageCTAProps["link"]) => {
	if (!link) return "";

	if (link.link_type === "external") {
		return link.url || "";
	} else if (link.link_type === "internal") {
		const pageData = link.page as Page;
		return `/${pageData.slug}` || "";
	}

	// Assuming internal links are stored in link.link_type
	return link.link_type || "";
};

const ImageCTA: React.FC<ImageCTAProps> = ({ media, label, header, link }) => {
	const outputMedia = () => {
		return (
			<TooImage {...media} className="[ w-full max-h-[calc(100vh-60px)] aspect-video object-cover object-center" />
		);
	};

	const targetValue = link?.link_type === "external" ? "_blank" : "_self";
	const linkData = {
		text: link?.link_text as string,
		isLink: true,
		isLight: true,
		link: {
			href: getLinkSlug(link),
			title: "Location page",
			target: targetValue as ButtonTargetType
		}
	};

	return (
		<section className="[ TooImageCTA ][ col-span-full ][ too-col ]">
			<div className={"[ too-grid-inner items-center ]"}>
				<div className="[ too-col ][ col-span-full row-start-1 row-end-1 ][ rounded-xl overflow-hidden ]">
					{media && outputMedia()}
				</div>
				<div className="[ too-col justify-center items-center ][ col-span-full sm:col-start-2 sm:col-end-12 md:col-start-3 md:col-end-11 xxl:col-start-5 xxl:col-end-9 row-start-1 row-end-1 ][ text-white text-center text-balance ]">
					{label && <p className="[ too-primary too-fs-18-22 font-light ][ mb-10-20  ]">{label}</p>}
					{header && <h3 className="[ too-secondary too-fs-48-66 font-normal ]">{header}</h3>}
					{link && <Button {...linkData} className="mt-20-30 text-white" />}
				</div>
			</div>
		</section>
	);
};

export { ImageCTA };
