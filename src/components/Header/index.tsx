import { Button } from "../UI/Button";
import { ButtonGroup } from "../UI/ButtonGroup";
import { Logo } from "../UI/Logo";

const Header = () => {
	return (
		<header className="[ TooHeader ][ too-fixed ][ py-20-30 ]">
			<div className="[ too-grid items-center ][ rounded-md ]">
				<div className="[ col-span-3 md:col-span-4 ]">
					<Logo />
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
	);
};

export { Header };
