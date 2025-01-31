import { NextResponse } from "next/server";

export async function POST(request: Request) {
	try {
		const { captchaToken } = await request.json();

		// Early return if missing required data
		if (!captchaToken || !process.env.RECAPTCHA_SECRET_KEY) {
			return NextResponse.json({ success: false, message: "Missing captcha token or secret key" }, { status: 400 });
		}

		const captchaResult = await validateCaptcha(captchaToken);

		return NextResponse.json(
			{
				success: captchaResult.success,
				message: captchaResult.success ? "Captcha validated successfully" : "Captcha validation failed",
				...(captchaResult["error-codes"] && { errors: captchaResult["error-codes"] })
			},
			{ status: captchaResult.success ? 200 : 400 }
		);
	} catch (error) {
		console.error("Error validating captcha:", error);
		return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 });
	}
}

// Helper function to validate captcha with Google
async function validateCaptcha(token: string) {
	const response = await fetch("https://www.google.com/recaptcha/api/siteverify", {
		method: "POST",
		headers: { "Content-Type": "application/x-www-form-urlencoded" },
		body: new URLSearchParams({
			secret: process.env.RECAPTCHA_SECRET_KEY!,
			response: token
		})
	});
	return response.json();
}
