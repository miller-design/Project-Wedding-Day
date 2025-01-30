interface FormData {
	firstName: string;
	lastName: string;
	email: string;
	phone: string;
	weddingAttendance: "attending" | "not-attending";
	ukReceptionAttendance: "attending" | "not-attending";
	dietryRequirements?: string;
	message?: string;
}

export const rsvpMessage = (formData: FormData) => {
	return `
		Thank you for filling out the form. Here are the details you provided:

		First Name: ${formData.firstName}
		Last Name: ${formData.lastName}
		Email: ${formData.email}
		Phone: ${formData.phone}
		Wedding Attendance: ${formData.weddingAttendance}
		Reception Attendance: ${formData.ukReceptionAttendance}
		Dietary Requirements: ${formData.dietryRequirements || "None"}
		Additional Notes: ${formData.message || "None"}

		${
			formData.weddingAttendance === "attending"
				? "We're so excited to celebrate with you!"
				: "We're sorry you won't be able to join us, but thank you for letting us know."
		}

		Best wishes,
		Jack & Paige`;
};
