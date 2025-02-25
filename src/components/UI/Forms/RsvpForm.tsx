"use client";

import { useEffect, useState } from "react";

import clsx from "clsx";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { SubmitHandler, useForm } from "react-hook-form";

import { Button } from "../Button";
import { rsvpFormFieldsType } from "./type";

const RsvpForm = () => {
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors }
	} = useForm<rsvpFormFieldsType>({
		mode: "onChange"
	});

	const [successMessage, setSuccessMessage] = useState<string | null>(null);
	const rowClasses = "[ too-row too-gap ][ w-full ]";
	const fullColClasses = "[ relative ][ too-col ][ w-full ]";
	const halfColClasses = "[ relative ][ too-col ][ w-1/2 ]";
	const inputClass = "[ too-input ]";
	const fontSizes = "[ too-fs-12 ]";
	const fieldSet =
		"[ too-fs-10 ][ absolute -translate-y-30-40 -translate-x-[8px] -mt-[6px] ][ p-[8px]  bg-gray-100 text-black/30 ]";
	const fieldSetOffset = "[ too-fs-12 !leading-none ][ -mt-[10px] ]";

	const submitProps = {
		text: "Submit",
		isLink: false,
		isLight: false,
		type: "submit" as const
	};

	const { executeRecaptcha } = useGoogleReCaptcha();

	const onSubmit: SubmitHandler<rsvpFormFieldsType> = async (data) => {
		if (!executeRecaptcha) {
			console.error("Error submitting form");
		} else {
			try {
				// Get reCAPTCHA token
				const token = await executeRecaptcha("rsvpForm");
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

				// If captcha is valid, proceed with form submission
				const response = await fetch("/api/formSubmissions", {
					method: "POST",
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify({
						...data,
						token // You might want to include the token in the form submission as well
					})
				});

				if (!response.ok) {
					throw new Error("Failed to submit form");
				}

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
		<div className="[ relative ][ p-10-20 pt-20-30 border border-black/10 rounded-md ]">
			<p className={`${fieldSet} uppercase `}>RSVP Info</p>
			<form onSubmit={handleSubmit(onSubmit)} className="[ too-col too-gap gap-y-10-20 ]">
				<div className={rowClasses}>
					<div className={halfColClasses}>
						<input
							type="string"
							placeholder="firstName"
							className={`${inputClass} ${errors.firstName ? "!border-red-500" : ""} ${fontSizes}`}
							{...register("firstName", { required: "First Name" })}
						/>
						<label className={fontSizes}>First Name</label>
					</div>
					<div className={halfColClasses}>
						<input
							type="string"
							placeholder="lastName"
							className={`${inputClass} ${errors.lastName ? "!border-red-500" : ""} ${fontSizes}`}
							{...register("lastName", { required: "Last Name" })}
						/>
						<label className={fontSizes}>Last Name</label>
					</div>
				</div>
				<div className={rowClasses}>
					<div className={fullColClasses}>
						<input
							type="email"
							placeholder="emailAddress"
							className={`${inputClass} ${errors.email ? "!border-red-500" : ""} ${fontSizes}`}
							{...register("email", { required: "Email Address" })}
						/>
						<label className={fontSizes}>Email Address</label>
					</div>
				</div>
				<div className={rowClasses}>
					<div className={fullColClasses}>
						<input
							type="tel"
							placeholder="Phone Number"
							className={`${inputClass} ${errors.phone ? "!border-red-500" : ""} ${fontSizes}`}
							{...register("phone", { required: "Phone Number" })}
						/>
						<label className={fontSizes}>Phone Number</label>
					</div>
				</div>
				<div className={rowClasses}>
					<div className={halfColClasses}>
						<fieldset
							className={clsx([
								"[ relative ][ too-col gap-y-[5px] ][ too-input-group ]",
								errors.weddingAttendance ? "!border-red-500" : ""
							])}
						>
							<legend className={clsx([fieldSet, fieldSetOffset, fontSizes])}>Wedding</legend>
							<div className="[ too-row gap-[5px] ]">
								<input
									type="radio"
									id="wedding-attending"
									value="attending"
									className="[ accent-current cursor-pointer ]"
									{...register("weddingAttendance", { required: "Wedding Attendance status" })}
								/>
								<label htmlFor="wedding-attending" className={`[ cursor-pointer ] ${fontSizes}`}>
									Attending
								</label>
							</div>
							<div className="[ too-row gap-[5px] ]">
								<input
									type="radio"
									id="wedding-not-attending"
									value="not attending"
									className="[ accent-current cursor-pointer ]"
									{...register("weddingAttendance")}
								/>
								<label htmlFor="wedding-not-attending" className={`[ cursor-pointer ] ${fontSizes}`}>
									Not Attending
								</label>
							</div>
						</fieldset>
					</div>
					<div className={halfColClasses}>
						<fieldset
							className={clsx([
								"[ relative ][ too-col gap-y-[5px] ][ too-input-group ]",
								errors.ukReceptionAttendance ? "!border-red-500" : ""
							])}
						>
							<legend className={clsx([fieldSet, fieldSetOffset, fontSizes])}>UK Reception</legend>
							<div className="[ too-row gap-[5px] ]">
								<input
									type="radio"
									id="uk-reception-attending"
									value="attending"
									className="[ accent-current cursor-pointer ]"
									{...register("ukReceptionAttendance", { required: "UK Reception Attendance status" })}
								/>
								<label htmlFor="uk-reception-attending" className={`[ cursor-pointer ] ${fontSizes}`}>
									Attending
								</label>
							</div>
							<div className="[ too-row gap-[5px] ]">
								<input
									type="radio"
									id="uk-reception-not-attending"
									value="not attending"
									className="[ accent-current cursor-pointer ]"
									{...register("ukReceptionAttendance")}
								/>
								<label htmlFor="uk-reception-not-attending" className={`[ cursor-pointer ] ${fontSizes}`}>
									Not Attending
								</label>
							</div>
						</fieldset>
					</div>
				</div>
				<div className={rowClasses}>
					<div className={fullColClasses}>
						<fieldset
							className={clsx([
								"[ relative ][ too-col gap-y-[5px] ][ too-input-group ]",
								errors.ownArrangements ? "!border-red-500" : ""
							])}
						>
							<legend className={clsx([fieldSet, fieldSetOffset, fontSizes])}>Accommodation</legend>
							<div className="[ too-row gap-[5px] ]">
								<input
									type="radio"
									id="wedding-hotel-yes"
									value="wedding hotel"
									className="[ accent-current cursor-pointer ]"
									{...register("ownArrangements", { required: "Accommodation choice" })}
								/>
								<label htmlFor="wedding-hotel-yes" className={`[ cursor-pointer ] ${fontSizes}`}>
									Wedding Hotel
								</label>
							</div>
							<div className="[ too-row gap-[5px] ]">
								<input
									type="radio"
									id="wedding-hotel-no"
									value="own arrangements"
									className="[ accent-current cursor-pointer ]"
									{...register("ownArrangements")}
								/>
								<label htmlFor="wedding-hotel-no" className={`[ cursor-pointer ] ${fontSizes}`}>
									Own Arrangements
								</label>
							</div>
						</fieldset>
					</div>
				</div>
				<div className={rowClasses}>
					<div className={fullColClasses}>
						<input
							type="text"
							placeholder="Dietry Requirements"
							className={`${inputClass} ${fontSizes}`}
							{...register("dietryRequirements")}
						/>
						<label className={fontSizes}>Dietry Requirements</label>
					</div>
				</div>
				<div className={rowClasses}>
					<div className={fullColClasses}>
						<textarea placeholder="Message" className={`too-textarea ${fontSizes}`} rows={4} {...register("message")} />
						<label className={fontSizes}>Notes</label>
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
	);
};

export { RsvpForm };
