import { ButtonProps } from "@/components/UI/Button/type";

const PageLinks: ButtonProps[] = [
	{
		text: "Location",
		isLink: true,
		isLight: true,
		link: {
			href: "/location",
			title: "Location page",
			target: "_self"
		}
	},
	{
		text: "Our Story",
		isLink: true,
		isLight: true,
		link: {
			href: "/our-story",
			title: "Our story page",
			target: "_self"
		}
	},
	{
		text: "Faq's",
		isLink: true,
		isLight: true,
		link: {
			href: "#",
			title: "faqs page",
			target: "_self"
		}
	}
];

const RsvpLink: ButtonProps = {
	text: "RSVP",
	isLink: true,
	isLight: true,
	link: {
		href: "/rsvp",
		title: "rsvp page",
		target: "_self"
	}
};

export { PageLinks, RsvpLink };
