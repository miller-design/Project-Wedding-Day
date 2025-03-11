"use client"

import { WatchIcon } from "@/Icons/watch"
import { Props } from "./type"
import { useState, useEffect } from "react"
import { Cross } from "@/Icons/cross"
import clsx from "clsx"

const CountdownTimer = ({ date }: Props) => {
	const baseTime = {days: '00', hours: '00', minutes: "00", seconds: '00'}
	const [timeLeft, setTimeLeft] = useState({days: '00', hours: '00', minutes: "00", seconds: '00'})
	const [isActive, setIsActive] = useState(false)

	const toggleState = () => {
		setIsActive(!isActive)
	}

	useEffect(() => {
		const calculateTimeLeft = () => {
			if (!date) return baseTime

			const now = new Date().getTime()
			const targetDate = new Date(date).getTime()
			const difference = targetDate - now

			if (difference <= 0) return baseTime

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

			return {days: formattedDays, hours: formattedHours, minutes: formattedMinutes, seconds: formattedSeconds}
		}

		// Update immediately
		setTimeLeft(calculateTimeLeft())

		// Update every second
		const timer = setInterval(() => {
			setTimeLeft(calculateTimeLeft())
		}, 1000)

		// Cleanup interval on unmount
		return () => clearInterval(timer)
	}, [])



	return (
		<>
		<aside
			className={clsx(["[ fixed right-10 bottom-[60px] z-50 ][ flex items-center justify-center gap-10-20 ] [ rounded-lg bg-white text-black ][ p-[30px] shadow-lg ][ transition-all duration-300 origin-bottom-right ]", isActive ? "opacity-100 scale-[1]" : "opacity-[0] scale-[0.95]" ])}
		>
			<div className="[ relative ][ too-col items-center ][ pt-[15px] ]">
				<p className="[ text-12 ][ absolute -top-[15px] left-1/2 -translate-x-1/2 ]">Wedding Coundown</p>
				<p className="[ relative -top-[7px] ][ flex items-center ][ text-42-50 too-mono leading-[1] slashed-zero tabular-nums ]">
					<span className="[ relative ]">
						<span className="[ absolute -bottom-[15px] left-1/2 -translate-x-1/2 ][ text-12 ]">Days</span>
						{timeLeft.days}
					</span>
					<span className="[ too-primary leading-[1] ][ px-10 ][ relative -top-[4px] ]">:</span>
					<span className="[ relative ]">
						<span className="[ absolute -bottom-[15px] left-1/2 -translate-x-1/2 ][ text-12 ]">Hours</span>
						{timeLeft.hours}
					</span>
					<span className="[ too-primary ][ px-10 ][ relative -top-[4px] ]">:</span>
					<span className="[ relative ]">
						<span className="[ absolute -bottom-[15px] left-1/2 -translate-x-1/2 ][ text-12 ]">Minutes</span>
						{timeLeft.minutes}
					</span>
					<span className="[ too-primary ][ px-10 ][ relative -top-[4px] ]">:</span>
					<span className="[ relative ]">
						<span className="[ absolute -bottom-[15px] left-1/2 -translate-x-1/2 ][ text-12 ]">Seconds</span>
						{timeLeft.seconds}
					</span>
				</p>
			</div>
		</aside>
		<button className="[ rounded-md ][ fixed right-10 bottom-[12px] z-60 w-[40px] h-[40px] ][ bg-white text-black ][ shadow-md ]" onClick={toggleState}>
			<span className="sr-only">Close</span>
			<Cross className={clsx(["[ too-abs-xy w-[30px] h-[30px] ][ hover:opacity-50 transition-opacity duration-300 ]", !isActive ? "hidden" : ""])} />
			<WatchIcon className={clsx(["too-abs-xy w-[25px] h-[25px] ][ hover:opacity-50 transition-opacity duration-300 ]", isActive ? "hidden" : ""])}/>
		</button>
		</>
	)
}

export { CountdownTimer }
