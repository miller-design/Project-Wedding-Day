"use client";

import { useState } from "react";

import clsx from "clsx";

import { AccordionProps } from "./type";

const Accordion = ({ title, children, isOpen = false, onToggle, className }: AccordionProps) => {
	const [isControlled] = useState(typeof onToggle !== "undefined");
	const [internalIsActive, setInternalIsActive] = useState(isOpen);
	// Use controlled or uncontrolled state
	const isActive = isControlled ? isOpen : internalIsActive;

	const handleToggle = () => {
		if (isControlled) {
			onToggle?.();
		} else {
			setInternalIsActive(!internalIsActive);
		}
	};

	return (
		<div className={`[ Accordion ][ border-x border-gray-200 ][ overflow-hidden ][ mb-2 ] ${className}`}>
			<button
				className={clsx(
					"[ w-full ][ p-20-30 ][ flex justify-between items-center ][ text-left ][ transition-colors duration-300 ]",
					{
						"bg-gray-50": isActive,
						"hover:bg-gray-50": !isActive
					}
				)}
				onClick={handleToggle}
				aria-expanded={isActive}
			>
				<span className="[ font-medium text-gray-900] ">{title}</span>
				<div className="[ relative ][ w-10 h-10 ]">
					<span
						className={`[ absolute inset-0 ][ w-10 h-10 flex items-center justify-center ][ font-medium text-gray-600 ][ transition-opacity duration-300 ] ${isActive ? "opacity-0" : "opacity-100"}`}
					>
						+
					</span>
					<span
						className={`[ absolute inset-0 ][ w-10 h-10 flex items-center justify-center ][ font-medium text-gray-600 ][ transition-opacity duration-300 ] ${isActive ? "opacity-100" : "opacity-0"}`}
					>
						−
					</span>
				</div>
			</button>
			<div
				className={`[ grid ] [ transition-all duration-[400ms] ease-out ] ${isActive ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
			>
				<div className="[ overflow-hidden ]">
					<div className="[ p-20-30 ][ border-t border-gray-200 ]">{children}</div>
				</div>
			</div>
		</div>
	);
};

export { Accordion };
