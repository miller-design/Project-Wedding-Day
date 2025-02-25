interface FormData {
	firstName: string;
	lastName: string;
	email: string;
	phone: string;
	weddingAttendance: "attending" | "not-attending";
	ukReceptionAttendance: "attending" | "not-attending";
	ownArrangements: "wedding hotel" | "own arrangements";
	dietryRequirements?: string;
	message?: string;
}

export const rsvpMessage = (formData: FormData) => {
	return `Hey ${formData.firstName},

Thank you for filling out our rsvp form.

Here are the details you provided:

First Name: ${formData.firstName}
Last Name: ${formData.lastName}
Email: ${formData.email}
Phone: ${formData.phone}
Wedding Attendance: ${formData.weddingAttendance}
Reception Attendance: ${formData.ukReceptionAttendance}
Accomodation: ${formData.ownArrangements}
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
