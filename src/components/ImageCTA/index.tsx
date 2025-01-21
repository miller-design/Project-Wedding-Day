import Link from "next/link";

import { TooImage } from "../TooImage";
import { ImageCTAProps } from "./type";

const ImageCTA: React.FC<ImageCTAProps> = ({ media, label, header, link }) => {
	const outputMedia = () => {
		return <TooImage {...media} className="[ w-full h-full aspect-video object-cover object-center" />;
	};

	return (
		<section className="[ TooImageCTA ][ col-span-full ][ too-col ]">
			<div className={"[ too-grid-inner items-center ]"}>
				<div className="[ too-col ][ col-span-full row-start-1 row-end-1 ][ rounded-xl overflow-hidden ]">
					{media && outputMedia()}
				</div>
				<div className="[ too-col justify-center items-center ][ col-span-full sm:col-start-5 sm:col-end-9 row-start-1 row-end-1 ]">
					<p>{label}</p>
					<h3>{header}</h3>
					{link && link.link_type === "external" && <>{link.url && <Link href={link.url as string}>Read More</Link>}</>}
				</div>
			</div>
		</section>
	);
};

export { ImageCTA };
