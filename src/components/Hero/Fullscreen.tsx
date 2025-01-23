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
			<div className="[ too-col justify-center items-center ][ text-white ]">
				{label && <p className="[ too-primary too-fs-18-22 font-light ][ mb-10-20  ]">{label}</p>}
				{title && <h1 className="[ too-secondary too-fs-52-90 font-normal ]">{title}</h1>}
				{message && <p className="[ too-primary too-fs-18-22 font-light !tracking-widest ][ mt-10-20 ]">{message}</p>}
			</div>
		);
	};

	return (
		<section className="[ TooFullScreenHero ][ too-grid-inner ][ col-span-full ][ pt-[87px] ]">
			<div className="[ relative ][ col-span-full row-start-1 row-end-2 ][ rounded-xl overflow-hidden relative ]">
				{media && outputMedia()}
				<div className="[ absolute inset-[0] bg-black opacity-20 pointer-events-none ]"></div>
			</div>
			<div className="[ relative ][ col-span-full row-start-1 row-end-2 ][ flex justify-center items-center ]">
				<div>{(label || title || message) && outputContent()}</div>
			</div>
		</section>
	);
};

export { FullScreenHero };
