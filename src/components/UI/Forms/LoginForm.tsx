"use client";

import { useEffect, useState } from "react";

import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { SubmitHandler, useForm } from "react-hook-form";

import { Button } from "../Button";
import { loginFormFieldsType } from "./type";

const LoginForm = () => {
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors }
	} = useForm<loginFormFieldsType>({
		mode: "onChange"
	});

	const [successMessage, setSuccessMessage] = useState<string | null>(null);
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

	const onSubmit: SubmitHandler<loginFormFieldsType> = async (data) => {
		if (!executeRecaptcha) {
			console.error("Error submitting form");
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

				console.log(data);

				setSuccessMessage("Form submitted successfully!");
				setTimeout(() => reset(), 2000);
			} catch (error) {
				console.error("Error submitting form:", error);
				setSuccessMessage("Error submitting form. Please try again.");
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
		.join(", ");

	return (
		<>
			<div className="[ too-fixed-xy w-full h-full ][ backdrop-blur-2xl ]">
				<span className="[ too-abs-xy w-full h-full z-[1] ][ bg-[hsla(0,_0%,_80%,_.35)] ]"></span>
			</div>
			<section className="[ too-fixed-xy p-40-50 rounded-xl overflow-hidden bg-white ][ w-[35vw] ]">
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
						{/* Error Messages at the end of the form */}
						<div className={rowClasses}>
							<Button {...submitProps} isDisabled={!!successMessage} />
						</div>
					</form>
					{errorMessages && (
						<p className="text-red-500 too-fs-10 absolute -bottom-[30px]">
							{errorMessages} {errorMessages.split(", ").length > 1 ? "are required fields" : "is a required field"}
						</p>
					)}
					{successMessage && <p className="text-green-500 too-fs-12 absolute -bottom-[30px]">{successMessage}</p>}
				</div>
			</section>
		</>
	);
};

export { LoginForm };
