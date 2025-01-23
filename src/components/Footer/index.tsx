import { Button } from "../UI/Button";
import { ButtonGroup } from "../UI/ButtonGroup";
import { Logo } from "../UI/Logo";

const Footer = () => {
	return (
		<>
			<header className={`[ TooFooter ][ pb-20-30 ]`}>
				<div className="[ relative ][ too-grid items-end ][ rounded-xl overflow-hidden ][ h-[30vh] min-h-190-200 ][ bg-gray-100 ][ p-20-30 ]">
					{/* added for water mark effect */}
					<Logo
						isStatic={true}
						className="[ too-abs-x invisible lg:visible lg:-top-[3vh] ][ opacity-[0.015] ][ lg:!text-[38vh] ]"
					/>
					<div className="[ col-span-3 md:col-span-4 ]">
						<Logo isStatic={true} />
					</div>
					<div className="[ hidden sm:flex justify-center items-center ][ sm:col-span-6 md:col-span-4 ]">
						<ButtonGroup>
							<Button text="Our Story" isLink={false} isLight={true} />
							<Button text="Location" isLink={false} isLight={true} />
							<Button text="Faq's" isLink={false} isLight={true} />
						</ButtonGroup>
					</div>
					<div className="[ flex justify-end items-center ][ col-span-3 md:col-span-4 ]">
						<Button text="RSVP" isLink={false} isLight={true} />
					</div>
				</div>
			</header>
		</>
	);
};

export { Footer };
