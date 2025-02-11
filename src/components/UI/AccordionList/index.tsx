"use client";

import { useState } from "react";

import { Accordion } from "../Accordion";
import { AccordionListProps } from "./type";

const AccordionList = ({ items, className = "" }: AccordionListProps) => {
	const [openId, setOpenId] = useState<string | number | null>(null);

	const handleToggle = (id: string | number) => {
		setOpenId((currentId) => (currentId === id ? null : id));
	};

	return (
		<div className={`${className}`}>
			{items.map((item, i) => (
				<Accordion
					key={i}
					title={item.title}
					isOpen={openId === i}
					onToggle={() => handleToggle(i)}
					className={`
						${i === 0 ? "rounded-t-lg border-t" : ""}
						${i === items.length - 1 ? "rounded-b-lg border-y" : ""}
						${i !== 0 && i !== items.length - 1 ? "rounded-none border-t" : ""}
					`.trim()}
				>
					{item.children}
				</Accordion>
			))}
		</div>
	);
};

export { AccordionList };
