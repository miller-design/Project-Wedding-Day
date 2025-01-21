import { TooImage } from "../TooImage";
import { FullScreenHeroProps } from "./type";

const FullScreenHero: React.FC<FullScreenHeroProps> = ({ media, label, title, message }) => {
	const outputMedia = () => {
		return (
			<div>
				<TooImage {...media} className="[ h-[calc(100vh-117px)] w-full object-cover object-center" />
			</div>
		);
	};

	const outputContent = () => {
		return (
			<div className="[ too-col justify-center items-center ]">
				{label && <p>{label}</p>}
				{title && <h1>{title}</h1>}
				{message && <p>{message}</p>}
			</div>
		);
	};

	return (
		<section className="[ TooFullScreenHero ][ too-grid-inner ][ col-span-full ][ pt-[87px] ]">
			<div className="[ col-span-full row-start-1 row-end-2 ][ rounded-xl overflow-hidden ]">
				{media && outputMedia()}
			</div>
			<div className="[ col-span-full row-start-1 row-end-2 ][ flex justify-center items-center ]">
				<div>{(label || title || message) && outputContent()}</div>
			</div>
		</section>
	);
};

export { FullScreenHero };
