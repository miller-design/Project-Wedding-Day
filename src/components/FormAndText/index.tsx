import { RsvpForm } from "../UI/Forms";
import { Wysiwyg } from "../Wysiwg";
import { FormAndTextProps } from "./type";

const FormAndText: React.FC<FormAndTextProps> = ({ content }) => {
	const firstBlock =
		"[ col-span-full md:col-start-1 md:col-end-7 lg:col-start-2 lg:col-end-7 xl:col-start-2 xl:col-end-6 px-30-40 md:pr-[0] lg:px-[0] ]";
	const secondBlock =
		"[ col-span-full md:col-start-7 md:col-end-13 lg:col-start-8 lg:col-end-12 pt-50-60 px-30-40 md:pt-[0] lg:px-[0] ]";

	const getFormMarkup = () => {
		return (
			<div className={firstBlock}>
				<RsvpForm />
			</div>
		);
	};

	const getContentMarkup = () => {
		return <div className={secondBlock}>{content && <Wysiwyg content={content} />}</div>;
	};

	return (
		<section className="[ TooImageAndText ][ col-span-full ][ too-col ]">
			<div className={"[ too-grid-inner gap-y-10-20 items-center ]"}>
				<div className="[ col-span-full bg-gray-100 rounded-xl overflow-hidden py-60-70 md:py-120-130 ]">
					<div className="[ too-grid-inner items-center ]">
						{getFormMarkup()}
						{content && getContentMarkup()}
					</div>
				</div>
			</div>
		</section>
	);
};

export { FormAndText };
