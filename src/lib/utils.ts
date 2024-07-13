import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

export function convertToMiliunits(amount: number) {
	return Math.round(amount * 1000)
}

export function convertFromMiliunits(amount: number) {
	return amount / 1000
}

export function formatCurrency(amount: number) {
	const finalAmount = convertFromMiliunits(amount)

	return Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'USD',
		minimumFractionDigits: 2
	}).format(finalAmount)
}
