'use client'

import { type ColumnDef } from '@tanstack/react-table'

import { type Transaction } from '@/lib/types'

import { DataTableColumnHeader } from '@/components/data-table/data-table-column-headers'
import { Checkbox } from '@/components/ui/checkbox'
import { TransactionsTableRowActions } from './transactions-table-row-actions'

export const columns: ColumnDef<Transaction>[] = [
	{
		id: 'select',
		header: ({ table }) => (
			<Checkbox
				checked={
					table.getIsAllPageRowsSelected() ||
					(table.getIsSomePageRowsSelected() && 'indeterminate')
				}
				onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
				aria-label='Select all'
			/>
		),
		cell: ({ row }) => (
			<Checkbox
				checked={row.getIsSelected()}
				onCheckedChange={(value) => row.toggleSelected(!!value)}
				aria-label='Select row'
			/>
		),
		enableSorting: false,
		enableHiding: false
	},
	{
		accessorKey: 'date',
		header: ({ column }) => (
			<DataTableColumnHeader
				column={column}
				title='Date'
			/>
		),
		cell: ({ row }) => {
			const createdAt = row.getValue('date')

			const formattedDate = createdAt
				? new Date(createdAt as string).toLocaleDateString('en-us')
				: ''

			return (
				<div className='flex space-x-2'>
					<span className='max-w-[500px] truncate font-medium'>
						{formattedDate}
					</span>
				</div>
			)
		}
	},
	{
		accessorKey: 'payee',
		header: ({ column }) => (
			<DataTableColumnHeader
				column={column}
				title='Payee'
			/>
		),
		cell: ({ row }) => {
			return (
				<div className='flex space-x-2'>
					<span className='max-w-[500px] truncate font-medium'>
						{row.getValue('payee')}
					</span>
				</div>
			)
		}
	},
	{
		accessorKey: 'category',
		header: ({ column }) => (
			<DataTableColumnHeader
				column={column}
				title='Category'
			/>
		),
		cell: ({ row }) => (
			<div className='capitalize'>{row.getValue('category')}</div>
		)
	},
	{
		accessorKey: 'amount',
		header: ({ column }) => (
			<DataTableColumnHeader
				column={column}
				title='Amount'
			/>
		),
		cell: ({ row }) => {
			const amount = parseFloat(row.getValue('amount'))

			// Format the amount as a dollar amount
			const formatted = new Intl.NumberFormat('en-US', {
				style: 'currency',
				currency: 'USD'
			}).format(amount)

			return <div className='font-medium'>{formatted}</div>
		}
	},
	{
		id: 'actions',
		cell: ({ row }) => <TransactionsTableRowActions row={row} />
	}
]
