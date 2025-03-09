"use client"

import { WatchIcon } from "@/Icons/watch"
import { Props } from "./type"
import { useState, useEffect } from "react"
import { Cross } from "@/Icons/cross"
import clsx from "clsx"

const CountdownTimer = ({ date }: Props) => {
	const [timeLeft, setTimeLeft] = useState("00:00:00:00")
	const [isActive, setIsActive] = useState(false)

	const toggleState = () => {
		setIsActive(!isActive)
	}

	useEffect(() => {
		const calculateTimeLeft = () => {
			if (!date) return "00:00:00:00"

			const now = new Date().getTime()
			const targetDate = new Date(date).getTime()
			const difference = targetDate - now

			if (difference <= 0) return "00:00:00:00"

			// Calculate days, hours, minutes, seconds
			const days = Math.floor(difference / (1000 * 60 * 60 * 24))
			const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
			const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
			const seconds = Math.floor((difference % (1000 * 60)) / 1000)

			// Format with leading zeros
			const formattedDays = days.toString().padStart(2, '0')
			const formattedHours = hours.toString().padStart(2, '0')
			const formattedMinutes = minutes.toString().padStart(2, '0')
			const formattedSeconds = seconds.toString().padStart(2, '0')

			return `${formattedDays}:${formattedHours}:${formattedMinutes}:${formattedSeconds}`
		}

		// Update immediately
		setTimeLeft(calculateTimeLeft())

		// Update every second
		const timer = setInterval(() => {
			setTimeLeft(calculateTimeLeft())
		}, 1000)

		// Cleanup interval on unmount
		return () => clearInterval(timer)
	}, [date])



	return (
		<>
		<aside
			className={clsx(["[ fixed right-10 bottom-[60px] z-50 ][ flex items-center justify-center gap-10-20 ] [ rounded-lg bg-white text-black ][ p-20-30 shadow-lg ][ transition-all duration-300 ]", isActive ? "opacity-100 translate-y-[0] " : "opacity-[0] translate-y-[10px]" ])}
		>
			<p className="[ text-42-50 too-mono leading-[1] slashed-zero tabular-nums ]">{timeLeft}</p>
		</aside>
		<button className="[ rounded-md ][ fixed right-10 bottom-10 z-60 w-[40px] h-[40px] ][ bg-white text-black ][ shadow-md ]" onClick={toggleState}>
			<span className="sr-only">Close</span>
			<Cross className={clsx(["[ too-abs-xy w-[30px] h-[30px] ][ hover:opacity-50 transition-opacity duration-300 ]", !isActive ? "hidden" : ""])} />
			<WatchIcon className={clsx(["too-abs-xy w-[25px] h-[25px] ][ hover:opacity-50 transition-opacity duration-300 ]", isActive ? "hidden" : ""])}/>
		</button>
		</>
	)
}

export { CountdownTimer }
