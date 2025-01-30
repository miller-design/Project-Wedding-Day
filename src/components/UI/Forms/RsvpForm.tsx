"use client";

import { useEffect, useState } from "react";

import clsx from "clsx";
import { SubmitHandler, useForm } from "react-hook-form";

import { Button } from "../Button";
import { formFieldsType } from "./type";

const RsvpForm = () => {
	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm<formFieldsType>({
		mode: "onChange"
	});

	const [successMessage, setSuccessMessage] = useState<string | null>(null);
	const rowClasses = "[ too-row too-gap ][ w-full ]";
	const fullColClasses = "[ relative ][ too-col ][ w-full ]";
	const halfColClasses = "[ relative ][ too-col ][ w-1/2 ]";
	const inputClass = "[ too-input ]";
	const fontSizes = "[ too-fs-12 ]";
	const fieldSet =
		"[ too-fs-10 ][ absolute -translate-y-20-30 -translate-x-[8px] -mt-[6px] ][ p-[8px]  bg-gray-100 text-black/30 ]";
	const fieldSetOffset = "[ too-fs-12 !leading-none ][ -mt-[10px] ]";

	const submitProps = {
		text: "Submit",
		isLink: false,
		isLight: false,
		type: "submit" as const
	};

	const onSubmit: SubmitHandler<formFieldsType> = async (data) => {
		try {
			const response = await fetch("/api/formSubmissions", {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify(data)
			});

			if (!response.ok) {
				throw new Error("Failed to submit form");
			}

			setSuccessMessage("Form submitted successfully!");
		} catch (error) {
			console.error("Error submitting form:", error);
			setSuccessMessage("Failed to submit form. Please try again.");
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
		<div className="[ relative ][ p-10-20 border border-black/10 ]">
			<p className={`${fieldSet} uppercase`}>RSVP Info</p>
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
				{errorMessages && (
					<p className="text-red-500 too-fs-12">
						{errorMessages} {errorMessages.split(", ").length > 1 ? "are required fields" : "is a required field"}
					</p>
				)}
				{successMessage && <p className="text-green-500 too-fs-12">{successMessage}</p>}
				<div className={rowClasses}>
					<Button {...submitProps} isDisabled={!!successMessage} />
				</div>
			</form>
		</div>
	);
};

export { RsvpForm };
