import { TextOnlyHeroProps } from "./type";

const TextOnlyHero: React.FC<TextOnlyHeroProps> = ({ label, title, message }) => {
	const outputContent = () => {
		return (
			<div>
				<p>{label}</p>
				<h1>{title}</h1>
				<p>{message}</p>
			</div>
		);
	};

	return (
		<section className="[ TooTextOnlyHero ]">
			<div>
				<div>{outputContent()}</div>
			</div>
		</section>
	);
};

export { TextOnlyHero };
