import { InfoIcon, MinusCircleIcon, PlusCircleIcon } from 'lucide-react'
import CurrentcyInput from 'react-currency-input-field'

import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger
} from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'

type Props = {
	value: string
	onChange: (value: string | undefined) => void
	placeholder?: string
	disabled?: boolean
}

export const AmountInput = ({
	value,
	onChange,
	placeholder,
	disabled
}: Props) => {
	const parsedValue = parseFloat(value)
	const isIncome = parsedValue > 0
	const isExpense = parsedValue < 0

	const onReverseValue = () => {
		if (!value) return

		const newValue = parsedValue * -1
		onChange(newValue.toString())
	}

	return (
		<div className='relative'>
			<TooltipProvider>
				<Tooltip delayDuration={100}>
					<TooltipTrigger asChild>
						<button
							type='button'
							onClick={onReverseValue}
							className={cn(
								'absolute bottom-1.5 left-1.5 flex items-center justify-center rounded-md bg-zinc-400 p-2 transition hover:bg-zinc-500',
								isIncome && 'bg-emerald-500 hover:bg-emerald-600',
								isExpense && 'bg-rose-500 hover:bg-rose-600'
							)}>
							{!parsedValue && <InfoIcon className='size-3 text-white' />}
							{isIncome && <PlusCircleIcon className='size-3 text-white' />}
							{isExpense && <MinusCircleIcon className='size-3 text-white' />}
						</button>
					</TooltipTrigger>
					<TooltipContent>
						Use [+] for income and [-] for expenses
					</TooltipContent>
				</Tooltip>
			</TooltipProvider>
			<CurrentcyInput
				prefix='$'
				className='flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 pl-10 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'
				placeholder={placeholder}
				value={value}
				decimalsLimit={2}
				decimalScale={2}
				onValueChange={onChange}
				disabled={disabled}
			/>
		</div>
	)
}
