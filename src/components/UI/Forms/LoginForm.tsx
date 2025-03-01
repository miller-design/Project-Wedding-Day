"use client";

import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";

import { setCookie } from "cookies-next";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { SubmitHandler, useForm } from "react-hook-form";

import { TooImage } from "@/components/TooImage";
import { TooImageProps } from "@/components/TooImage/type";

import { Button } from "../Button";
import { loginFormFieldsType, loginFormProps } from "./type";

const LoginForm: React.FC<loginFormProps> = ({ password, bg }) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		setError
	} = useForm<loginFormFieldsType>({
		mode: "onChange"
	});

	const router = useRouter();
	const [successMessage, setSuccessMessage] = useState<string | null>(null);
	const [formError, setFormError] = useState<string | null>(null);
	const rowClasses = "[ too-row too-gap ][ w-full ]";
	const fullColClasses = "[ relative ][ too-col ][ w-full ]";
	const inputClass = "[ too-input ]";
	const fontSizes = "[ too-fs-12 ]";
	const fieldSet =
		"[ too-fs-10 ][ absolute -translate-y-30-40 -translate-x-[8px] -mt-[6px] ][ p-[8px]  bg-gray-100 text-black/30 ]";

	const submitProps = {
		text: "Login",
		isLink: false,
		isLight: false,
		type: "submit" as const
	};

	const { executeRecaptcha } = useGoogleReCaptcha();

	const handleSuccessfulLogin = () => {
		// After setting the cookie
		// Set cookie for 10 days using cookies-next
		setCookie("jp_allow_access", "true", {
			maxAge: 60 * 60 * 24 * 10, // 10 days in seconds
			path: "/",
			sameSite: "strict"
		});
		// Refresh the page to trigger a new server-side render
		router.refresh();
	};

	const onSubmit: SubmitHandler<loginFormFieldsType> = async (data) => {
		setFormError(null); // Reset form error at the start of submission
		if (!executeRecaptcha) {
			setFormError("reCAPTCHA not available");
		} else {
			try {
				// Get reCAPTCHA token
				const token = await executeRecaptcha("loginForm");
				// First, verify the reCAPTCHA token
				const captchaResponse = await fetch("/api/captchaValidation", {
					method: "POST",
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify({ captchaToken: token })
				});

				if (!captchaResponse.ok) {
					throw new Error("reCAPTCHA verification failed");
				}

				const formValue = data.password;
				const sitePW = password;

				if (formValue !== sitePW) {
					setError("password", { type: "manual", message: "Password does not match" });
				} else {
					handleSuccessfulLogin();
					setSuccessMessage("Form submitted successfully!");
				}
			} catch (error) {
				console.error("Error submitting form:", error);
				setFormError("Error submitting form. Please try again.");
				setError("password", { type: "manual", message: "Error submitting form. Please try again." });
			}
		}
	};

	useEffect(() => {
		if (Object.keys(errors).length > 0) {
			setSuccessMessage(null);
		}
	}, [errors]);

	// Collect all error messages into a single string
	const errorMessages = Object.values(errors)
		.map((error) => error?.message)
		.filter(Boolean)
		.join(", ");

	const displayError = errorMessages || formError;
	const isValidationError = errorMessages && !formError;

	return (
		<>
			<div className="[ too-fixed-xy w-full h-full ]">
				<span className="[ too-abs-xy w-full h-full z-[1] ][ bg-[hsla(0,_0%,_80%,_.35)] backdrop-blur-lg ]"></span>
				{bg.image.src && (
					<TooImage
						{...(bg as TooImageProps)}
						className="[ too-abs-xy h-[calc(100vh-60px)] md:h-[calc(100vh-117px)] !w-[calc(100vw-60px)] md:!w-[calc(100vw-117px)] object-cover object-center"
					/>
				)}
			</div>
			<section className="[ too-fixed-xy p-40-50 rounded-xl overflow-hidden bg-white shadow-xl ][ w-[80vw] sm:w-[65vw] md:w-[45vw] lg:w-[35vw] ]">
				<div className="[ relative ][ p-10-20 pt-20-30 border border-black/10 rounded-md ]">
					<p className={`${fieldSet} uppercase rounded-md`}>Site Login</p>
					<form onSubmit={handleSubmit(onSubmit)} className="[ too-col too-gap gap-y-10-20 ]">
						<div className={rowClasses}>
							<div className={fullColClasses}>
								<input
									type="password"
									placeholder="Password"
									className={`${inputClass} ${errors.password ? "!border-red-500" : ""} ${fontSizes}`}
									{...register("password", { required: "Password" })}
								/>
								<label className={fontSizes}>Password</label>
							</div>
						</div>
						<div className={rowClasses}>
							<Button {...submitProps} isDisabled={!!successMessage} />
						</div>
					</form>
					{displayError && (
						<p className="text-red-500 too-fs-10 absolute -bottom-[30px]">
							{isValidationError
								? `${errorMessages} ${errorMessages.split(", ").length > 1 ? "are required fields" : "is a required field"}`
								: formError}
						</p>
					)}
					{successMessage && <p className="text-green-500 too-fs-12 absolute -bottom-[30px]">{successMessage}</p>}
				</div>
			</section>
		</>
	);
};
export { LoginForm };
