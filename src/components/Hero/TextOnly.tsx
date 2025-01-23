import { TextOnlyHeroProps } from "./type";

const TextOnlyHero: React.FC<TextOnlyHeroProps> = ({ label, title, message }) => {
	const outputContent = () => {
		return (
			<div className="[ too-col justify-center items-center text-center ][ text-black ]">
				{label && <p className="[ too-primary too-fs-18-22 font-light ][ mb-10 mt-[0] ]">{label}</p>}
				{title && <h1 className="[ too-secondary too-fs-52-90 font-normal text-balance ]">{title}</h1>}
				{message && <p className="[ too-primary too-fs-18-22 font-light !tracking-widest ][ mt-10-20 ]">{message}</p>}
			</div>
		);
	};

	return (
		<section className="[ TooTextOnlyHero ][ too-grid-inner ][ col-span-full ][ pt-[87px] ]">
			<div className="[ relative ][ col-span-full sm:col-start-3 sm:col-end-11 md:col-start-4 md:col-end-10 xxl:col-start-5 xxl:col-end-9 row-start-1 row-end-2 ][ flex justify-center items-center ]">
				<div className="[ pt-110-120 pb-170-180 ]">{(label || title || message) && outputContent()}</div>
			</div>
			<div className="[ col-span-full ][ h-[1px] w-full ][ bg-slate-200 ]"></div>
		</section>
	);
};

export { TextOnlyHero };
