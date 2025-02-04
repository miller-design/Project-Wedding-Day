type Email = `${string}@${string}`;

export type rsvpFormFieldsType = {
	firstName: string;
	lastName: string;
	email: Email;
	phone: number;
	weddingAttendance: "attending" | "not attending";
	ukReceptionAttendance: "attending" | "not attending";
	dietryRequirements: string;
	message: string;
};

export type loginFormFieldsType = {
	password: string;
};

export type loginFormProps = {
	password: string | null | undefined;
	bg: {
		image: {
			src: string | null | undefined;
			alt: string | null | undefined;
		};
		width: number | null | undefined;
		height: number | null | undefined;
		sizes: number[];
		priority: boolean;
		intrinsic: boolean;
	};
};
