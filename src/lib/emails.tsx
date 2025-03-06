import React from "react";

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
	return (
		<>
			<p>Hey {formData.firstName}</p>
			<p>Thank you for filling out our RSVP form.</p>
			<p>Here are the details you have provided:</p>
			<ul>
				<li>
					First Name: <strong>{formData.firstName}</strong>
				</li>
				<li>
					Last Name: <strong>{formData.lastName}</strong>
				</li>
				<li>
					Email: <strong>{formData.email}</strong>
				</li>
				<li>
					Phone: <strong>{formData.phone}</strong>
				</li>
				<li>
					Wedding Attendance: <strong>{formData.weddingAttendance}</strong>
				</li>
				<li>
					Reception Attendance: <strong>{formData.ukReceptionAttendance}</strong>
				</li>
				<li>
					Accommodation: <strong>{formData.ownArrangements}</strong>
				</li>
				<li>
					Dietary Requirements: <strong>{formData.dietryRequirements || "None"}</strong>
				</li>
				<li>
					Additional Notes: <strong>{formData.message || "None"}</strong>
				</li>
			</ul>
			{formData.weddingAttendance === "attending" ? (
				<>
					<p>We&apos;re so excited to celebrate with you!</p>
					<p>Now for the important part: how to book!</p>
					<p>
						Booking Info: We recommend booking through TUI Loughborough. You can either email{" "}
						<a href="mailto:loughborough@tui.co.uk">loughborough@tui.co.uk</a> or call the branch directly at{" "}
						<a href="tel:+441509233042">+44 1509 233042</a>. Ask for Nikita and mention that you are booking as part of
						Jack & Paige&apos;s wedding party.
					</p>
					{formData.ownArrangements === "own arrangements" && (
						<p>
							If you&apos;re planning to stay at a different hotel but plan to join us for the wedding, you&apos;ll need
							a day pass to access the venue. Just check in at reception when you arrive, and they&apos;ll sort
							everything for you. Please find below a list of options for day passes:
							<br />
							<br />
							Full Day Pass (10 AM - Midnight): €80 per adult | €35 per child (2-12 yrs)
							<br />
							Half Day Pass (3 PM - Midnight): €50 per adult | €25 per child (2-12 yrs)
							<br />
							Drinks Pass (for private wedding receptions, entry 30 minutes before the ceremony): €35 per adult | €20
							per child (2-12 yrs)
						</p>
					)}
					<p></p>
					<p>We also recommend keeping an eye on prices, as they may fluctuate!</p>
					<p>
						A link to the hotel can be found{" "}
						<a href="https://www.tui.co.uk/destinations/europe/greece/kos/helona-beach/hotels/hotel-atlantica-portobello-royal.html">
							here
						</a>
						, the wedding will be taking place on <strong>21 May 2026</strong>. We will be flying out on the 17th May so
						please ensure you arrive at the hotel in ample time for the wedding.
					</p>
					<p>If you have any questions, please don&apos;t hesitate to contact us.</p>
				</>
			) : formData.ukReceptionAttendance === "attending" ? (
				<>
					<p>
						We&apos;re sorry you won&apos;t be able to join us for the wedding, but we&apos;re excited to see you at the
						reception!
					</p>
					<p>
						We&apos;re still finalising the venue, but the reception is going to be at a local venue around the
						Coalville/Ashby area. If you will need somewhere to stay for the night, please let us know and we can
						suggest any B&B&apos;s or local hotels.
					</p>
				</>
			) : (
				<p>We&apos;re sorry you won&apos;t be able to join us, but thank you for letting us know.</p>
			)}
			<p>
				Best wishes,
				<br />
				Jack & Paige
			</p>
		</>
	);
};
