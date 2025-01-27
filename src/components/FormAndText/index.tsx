import { RsvpForm } from "../UI/Forms";
import { Wysiwyg } from "../Wysiwg";
import { FormAndTextProps } from "./type";

const FormAndText: React.FC<FormAndTextProps> = ({ content }) => {
	const firstBlock =
		"[ col-start-2 col-end-6 sm:col-start-1 sm:col-end-7 lg:col-start-2 lg:col-end-6 sm:px-30-40 lg:px-[0] ]";
	const secondBlock =
		"[ col-start-2 col-end-6 sm:col-start-7 sm:col-end-13 lg:col-start-8 lg:col-end-12 sm:px-30-40 lg:px-[0] ]";

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
					<div className="[ too-grid-inner ]">
						{getFormMarkup()}
						{content && getContentMarkup()}
					</div>
				</div>
			</div>
		</section>
	);
};

export { FormAndText };
