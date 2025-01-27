"use client";

import { SubmitHandler, useForm } from "react-hook-form";

import { formFieldsType } from "./type";

const RsvpForm = () => {
	const { register, handleSubmit } = useForm<formFieldsType>();
	const onSubmit: SubmitHandler<formFieldsType> = (data) => console.log(data);
	const rowClasses = "[ too-row too-gap ][ w-full ]";
	const fullColClasses = "[ too-col ][ w-full ]";
	const halfColClasses = "[ too-col ][ w-1/2 ]";
	const inputClass = "[ too-input ]";

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<div className={rowClasses}>
				<div className={halfColClasses}>
					<input type="string" placeholder="firstName" className={inputClass} {...register("firstName")} />
					<label>First Name</label>
				</div>
				<div className={halfColClasses}>
					<input type="string" placeholder="lastName" className={inputClass} {...register("lastName")} />
					<label>Last Name</label>
				</div>
			</div>
			<div className={rowClasses}>
				<div className={fullColClasses}>
					<input type="email" placeholder="emailAddress" className={inputClass} {...register("email")} />
					<label>Email Address</label>
				</div>
			</div>
			<div className={rowClasses}>
				<div className={fullColClasses}>
					<input type="tel" placeholder="Phone Number" className={inputClass} {...register("phone")} />
					<label>Phone Number</label>
				</div>
			</div>
			<div className={rowClasses}>
				<div className={fullColClasses}>
					<div>
						<input type="radio" id="attending" name="attendance" value="attending" />
						<label htmlFor="attending">Attending</label>
					</div>
					<div>
						<input type="radio" id="huey" name="attendance" value="not attending" />
						<label htmlFor="huey">Not Attending</label>
					</div>
				</div>
			</div>
			<div className={rowClasses}>
				<div className={fullColClasses}>
					<label>Dietry Requirements</label>
					<input
						type="text"
						placeholder="Dietry Requirements"
						className={inputClass}
						{...register("dietryRequirements")}
					/>
				</div>
			</div>
			<div className={rowClasses}>
				<div className={fullColClasses}>
					<label>Message</label>
					<textarea placeholder="Message" {...register("message")} />
				</div>
			</div>
			<div className={rowClasses}>
				<button type="submit">Submit</button>
			</div>
		</form>
	);
};

export { RsvpForm };
