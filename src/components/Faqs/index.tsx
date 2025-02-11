import { AccordionList } from "../UI/AccordionList";
import { FaqsProps } from "./type";

const Faqs: React.FC<FaqsProps> = ({ className, items }) => {
	return (
		<section className="[ TooImageAndText ][ col-span-full ][ too-col ]">
			<div className={"[ too-grid-inner gap-y-10-20 items-center ]"}>
				<div className="[ col-span-full bg-gray-100 rounded-xl overflow-hidden py-60-70 md:py-120-130 ]">
					<div className="[ too-grid-inner items-center ]">
						<div className="[ col-span-full md:col-start-1 md:col-end-13 lg:col-start-2 lg:col-end-12 px-30-40 md:pt-[0] lg:px-[0] ]">
							<AccordionList className={className} items={items} />
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export { Faqs };
