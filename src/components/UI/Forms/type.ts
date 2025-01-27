type Email = `${string}@${string}`;

export type formFieldsType = {
	firstName: string;
	lastName: string;
	email: Email;
	phone: number;
	attendance: "attending" | "not attending";
	dietryRequirements: string;
	message: string;
};
