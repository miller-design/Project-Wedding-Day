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
