import { NextResponse } from "next/server";

import configPromise from "@payload-config";
import { getPayload } from "payload";
import { Resend } from "resend";

import { rsvpMessage } from "@/lib/emails";

/**
 * POST endpoint handler for form submissions
 * Processes incoming form data and stores it in the database
 * Also sends a confirmation email to the submitter
 */
export async function POST(request: Request) {
	try {
		// Parse the JSON data from the incoming request
		const formData = await request.json();

		// Initialize Payload CMS with the configuration
		const payload = await getPayload({ config: configPromise });

		// Create a new document in the form_submissions collection
		// Spreads all form data into the document
		const submission = await payload.create({
			collection: "form_submissions",
			data: {
				...formData
			}
		});

		// Send an automated confirmation email to the form submitter
		// TODO: Customize email template with actual email template (react email)
		const resend = new Resend(process.env.RESEND_API_KEY);
		const { error } = await resend.emails.send({
			to: formData.email,
			from: "Jack & Paige <noreply@jp-wedding.day>",
			subject: "RSVP Confirmation",
			react: rsvpMessage(formData)
		});

		if (error) {
			return NextResponse.json(
				{
					success: false,
					message: "Failed to send confirmation email",
					error
				},
				{ status: 400 }
			);
		}

		// Return success response with the created submission
		return NextResponse.json(
			{
				success: true,
				message: "Form submitted successfully",
				submission
			},
			{ status: 201 } // 201 Created status code
		);
	} catch (error) {
		// Log any errors for debugging
		console.error("Error in form submission:", error);

		// Return error response to the client
		return NextResponse.json(
			{
				success: false,
				message: "Failed to submit form"
			},
			{ status: 500 } // 500 Internal Server Error status code
		);
	}
}
