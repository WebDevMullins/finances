'use client'

import { differenceInDays, formatDate, startOfMonth } from 'date-fns'
import { MinusCircleIcon, PlusCircleIcon } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts'
import { toast } from 'sonner'

import { DateRangePicker } from '@/components/date-range-picker'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle
} from '@/components/ui/card'
import {
	type ChartConfig,
	ChartContainer,
	ChartLegend,
	ChartLegendContent,
	ChartTooltip,
	ChartTooltipContent
} from '@/components/ui/chart'

import { MAX_DATE_RANGE_DAYS } from '@/lib/constants'
import { type Transaction } from '@/lib/types'
import { formatCurrency } from '@/lib/utils'

interface ChartData {
	date: string
	income: number
	expense: number
}

const chartConfig = {
	visitors: {
		label: 'Visitors'
	},
	income: {
		label: 'Income',
		color: 'hsl(var(--chart-1))',
		icon: PlusCircleIcon
	},
	expense: {
		label: 'Expense',
		color: 'hsl(var(--chart-2))',
		icon: MinusCircleIcon
	}
} satisfies ChartConfig

export function Chart({ transactionData }: { transactionData: Transaction[] }) {
	const [dateRange, setDateRange] = useState<{ from: Date; to: Date }>({
		from: startOfMonth(new Date()),
		to: new Date()
	})

	const [filteredData, setFilteredData] = useState<ChartData[]>([])

	useEffect(() => {
		const filtered = transactionData.filter((data) => {
			const date = new Date(data.date)
			return date >= dateRange.from && date <= dateRange.to
		})

		const groupedData = filtered.reduce(
			(acc, data) => {
				const date = formatDate(data.date, 'yyyy-MM-dd')
				if (!acc[date]) {
					acc[date] = { date, income: 0, expense: 0 }
				}
				if (data.amount > 0) {
					acc[date].income += data.amount
				} else {
					acc[date].expense += Math.abs(data.amount)
				}
				return acc
			},
			{} as Record<string, ChartData>
		)

		const transformedData = Object.values(groupedData).map((data) => ({
			...data,
			income: formatCurrency(data.income) as unknown as number,
			expense: formatCurrency(data.expense) as unknown as number
		}))

		console.log('@@@ ', transformedData)

		setFilteredData(transformedData)
	}, [dateRange, transactionData])

	return (
		<Card>
			<CardHeader className='flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row'>
				<div className='grid flex-1 gap-1 text-center sm:text-left'>
					<CardTitle>Area Chart - Interactive</CardTitle>
					<CardDescription>
						Showing total visitors for the last 3 months
					</CardDescription>
				</div>
				<DateRangePicker
					initialDateFrom={dateRange.from}
					initialDateTo={dateRange.to}
					showCompare={false}
					onUpdate={(values) => {
						const { from, to } = values.range
						if (!from || !to) return
						if (differenceInDays(to, from) > MAX_DATE_RANGE_DAYS) {
							toast.error(
								`The selected date range is too large. Maximum date range is ${MAX_DATE_RANGE_DAYS} days.`
							)
							return
						}
						setDateRange({ from, to })
					}}
				/>
			</CardHeader>
			<CardContent className='px-2 pt-4 sm:px-6 sm:pt-6'>
				<ChartContainer
					config={chartConfig}
					className='aspect-auto h-[250px] w-full'>
					<BarChart
						accessibilityLayer
						data={filteredData}>
						<CartesianGrid vertical={false} />
						<XAxis
							dataKey='date'
							tickLine={false}
							axisLine={false}
							tickMargin={8}
							minTickGap={32}
							tickFormatter={(value: number | string | Date) => {
								const date = new Date(value)
								return formatDate(date, 'MMM')
							}}
						/>
						<ChartTooltip
							cursor={false}
							content={
								<ChartTooltipContent
									labelFormatter={(value: number | string | Date) => {
										return new Date(value).toLocaleDateString('en-US', {
											month: 'short',
											day: 'numeric'
										})
									}}
									indicator='dot'
								/>
							}
						/>
						<Bar
							dataKey='income'
							fill='var(--color-income)'
							// radius={[8, 8, 0, 0]}
							stackId='a'
						/>
						<Bar
							dataKey='expense'
							fill='var(--color-expense)'
							// radius={[0, 0, 8, 8]}
							stackId='a'
						/>
						<ChartLegend content={<ChartLegendContent />} />
					</BarChart>
				</ChartContainer>
			</CardContent>
		</Card>
	)
}
