import { cn } from '@/lib/utils'
import { format } from 'date-fns'
import { CalendarIcon } from 'lucide-react'
import { type SelectSingleEventHandler } from 'react-day-picker'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { FormControl } from '@/components/ui/form'
import {
	Popover,
	PopoverContent,
	PopoverTrigger
} from '@/components/ui/popover'

type Props = {
	value?: Date
	onChange: SelectSingleEventHandler
	disabled?: boolean
}

export const DatePicker = ({ value, onChange, disabled }: Props) => {
	return (
		<Popover>
			<PopoverTrigger asChild>
				<FormControl>
					<Button
						disabled={disabled}
						variant={'outline'}
						className={cn(
							'w-full pl-3 text-left font-normal',
							!value && 'text-muted-foreground'
						)}>
						{value ? format(value, 'PPP') : <span>Pick a date</span>}
						<CalendarIcon className='ml-auto size-4 opacity-50' />
					</Button>
				</FormControl>
			</PopoverTrigger>
			<PopoverContent
				className='w-auto p-0'
				align='start'>
				<Calendar
					mode='single'
					selected={value}
					onSelect={onChange}
					disabled={disabled}
					initialFocus
				/>
			</PopoverContent>
		</Popover>
	)
}
