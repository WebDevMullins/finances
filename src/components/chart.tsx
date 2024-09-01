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

// const chartData = [
// 	{ date: '2024-08-21', income: 222, expense: 150 },
// 	{ date: '2024-04-02', income: 97, expense: 180 },
// 	{ date: '2024-04-03', income: 167, expense: 120 },
// 	{ date: '2024-04-04', income: 242, expense: 260 },
// 	{ date: '2024-04-05', income: 373, expense: 290 },
// 	{ date: '2024-04-06', income: 301, expense: 340 },
// 	{ date: '2024-04-07', income: 245, expense: 180 },
// 	{ date: '2024-04-08', income: 409, expense: 320 },
// 	{ date: '2024-04-09', income: 59, expense: 110 },
// 	{ date: '2024-04-10', income: 261, expense: 190 },
// 	{ date: '2024-04-11', income: 327, expense: 350 },
// 	{ date: '2024-04-12', income: 292, expense: 210 },
// 	{ date: '2024-04-13', income: 342, expense: 380 },
// 	{ date: '2024-04-14', income: 137, expense: 220 },
// 	{ date: '2024-04-15', income: 120, expense: 170 },
// 	{ date: '2024-04-16', income: 138, expense: 190 },
// 	{ date: '2024-04-17', income: 446, expense: 360 },
// 	{ date: '2024-04-18', income: 364, expense: 410 },
// 	{ date: '2024-04-19', income: 243, expense: 180 },
// 	{ date: '2024-04-20', income: 89, expense: 150 },
// 	{ date: '2024-04-21', income: 137, expense: 200 },
// 	{ date: '2024-04-22', income: 224, expense: 170 },
// 	{ date: '2024-04-23', income: 138, expense: 230 },
// 	{ date: '2024-04-24', income: 387, expense: 290 },
// 	{ date: '2024-04-25', income: 215, expense: 250 },
// 	{ date: '2024-04-26', income: 75, expense: 130 },
// 	{ date: '2024-04-27', income: 383, expense: 420 },
// 	{ date: '2024-04-28', income: 122, expense: 180 },
// 	{ date: '2024-04-29', income: 315, expense: 240 },
// 	{ date: '2024-04-30', income: 454, expense: 380 },
// 	{ date: '2024-05-01', income: 165, expense: 220 },
// 	{ date: '2024-05-02', income: 293, expense: 310 },
// 	{ date: '2024-05-03', income: 247, expense: 190 },
// 	{ date: '2024-05-04', income: 385, expense: 420 },
// 	{ date: '2024-05-05', income: 481, expense: 390 },
// 	{ date: '2024-05-06', income: 498, expense: 520 },
// 	{ date: '2024-05-07', income: 388, expense: 300 },
// 	{ date: '2024-05-08', income: 149, expense: 210 },
// 	{ date: '2024-05-09', income: 227, expense: 180 },
// 	{ date: '2024-05-10', income: 293, expense: 330 },
// 	{ date: '2024-05-11', income: 335, expense: 270 },
// 	{ date: '2024-05-12', income: 197, expense: 240 },
// 	{ date: '2024-05-13', income: 197, expense: 160 },
// 	{ date: '2024-05-14', income: 448, expense: 490 },
// 	{ date: '2024-05-15', income: 473, expense: 380 },
// 	{ date: '2024-05-16', income: 338, expense: 400 },
// 	{ date: '2024-05-17', income: 499, expense: 420 },
// 	{ date: '2024-05-18', income: 315, expense: 350 },
// 	{ date: '2024-05-19', income: 235, expense: 180 },
// 	{ date: '2024-05-20', income: 177, expense: 230 },
// 	{ date: '2024-05-21', income: 82, expense: 140 },
// 	{ date: '2024-05-22', income: 81, expense: 120 },
// 	{ date: '2024-05-23', income: 252, expense: 290 },
// 	{ date: '2024-05-24', income: 294, expense: 220 },
// 	{ date: '2024-05-25', income: 201, expense: 250 },
// 	{ date: '2024-05-26', income: 213, expense: 170 },
// 	{ date: '2024-05-27', income: 420, expense: 460 },
// 	{ date: '2024-05-28', income: 233, expense: 190 },
// 	{ date: '2024-05-29', income: 78, expense: 130 },
// 	{ date: '2024-05-30', income: 340, expense: 280 },
// 	{ date: '2024-05-31', income: 178, expense: 230 },
// 	{ date: '2024-06-01', income: 178, expense: 200 },
// 	{ date: '2024-06-02', income: 470, expense: 410 },
// 	{ date: '2024-06-03', income: 103, expense: 160 },
// 	{ date: '2024-06-04', income: 439, expense: 380 },
// 	{ date: '2024-06-05', income: 88, expense: 140 },
// 	{ date: '2024-06-06', income: 294, expense: 250 },
// 	{ date: '2024-06-07', income: 323, expense: 370 },
// 	{ date: '2024-06-08', income: 385, expense: 320 },
// 	{ date: '2024-06-09', income: 438, expense: 480 },
// 	{ date: '2024-06-10', income: 155, expense: 200 },
// 	{ date: '2024-06-11', income: 92, expense: 150 },
// 	{ date: '2024-06-12', income: 492, expense: 420 },
// 	{ date: '2024-06-13', income: 81, expense: 130 },
// 	{ date: '2024-06-14', income: 426, expense: 380 },
// 	{ date: '2024-06-15', income: 307, expense: 350 },
// 	{ date: '2024-06-16', income: 371, expense: 310 },
// 	{ date: '2024-06-17', income: 475, expense: 520 },
// 	{ date: '2024-06-18', income: 107, expense: 170 },
// 	{ date: '2024-06-19', income: 341, expense: 290 },
// 	{ date: '2024-06-20', income: 408, expense: 450 },
// 	{ date: '2024-06-21', income: 169, expense: 210 },
// 	{ date: '2024-06-22', income: 317, expense: 270 },
// 	{ date: '2024-06-23', income: 480, expense: 530 },
// 	{ date: '2024-06-24', income: 132, expense: 180 },
// 	{ date: '2024-06-25', income: 141, expense: 190 },
// 	{ date: '2024-06-26', income: 434, expense: 380 },
// 	{ date: '2024-06-27', income: 448, expense: 490 },
// 	{ date: '2024-06-28', income: 149, expense: 200 },
// 	{ date: '2024-06-29', income: 103, expense: 160 },
// 	{ date: '2024-08-30', income: 446, expense: 400 }
// ]

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
								return date.toLocaleDateString('en-US', {
									month: 'short',
									day: 'numeric'
								})
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
