'use client'

import { type ColumnDef } from '@tanstack/react-table'

import { type Bill } from '@/lib/types'

import { DataTableColumnHeader } from '@/components/data-table/data-table-column-headers'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { formatCurrency } from '@/lib/utils'
import { CheckIcon, XIcon } from 'lucide-react'
import { TransactionsTableRowActions } from './bills-table-row-actions'

export const columns: ColumnDef<Bill>[] = [
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
		accessorKey: 'dueDate',
		header: ({ column }) => (
			<DataTableColumnHeader
				column={column}
				title='Due Date'
			/>
		),
		cell: ({ row }) => {
			const createdAt = row.getValue('dueDate')

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
	// {
	// 	accessorKey: 'account',
	// 	header: ({ column }) => (
	// 		<DataTableColumnHeader
	// 			column={column}
	// 			title='Account'
	// 		/>
	// 	),
	// 	cell: ({ row }) => (
	// 		<div className='capitalize'>{row.getValue('account')}</div>
	// 	)
	// },
	{
		accessorKey: 'isRecurring',
		header: ({ column }) => (
			<DataTableColumnHeader
				column={column}
				title='Recurring'
			/>
		),
		cell: ({ row }) => {
			const value = row.getValue('isRecurring')
			return (
				<div className='ml-6'>
					{value ? (
						<CheckIcon className='size-4 text-emerald-500' />
					) : (
						<XIcon className='size-4 text-red-500' />
					)}
				</div>
			)
		}
	},
	{
		accessorKey: 'isPaid',
		header: ({ column }) => (
			<DataTableColumnHeader
				column={column}
				title='Paid'
			/>
		),
		cell: ({ row }) => {
			const value = row.getValue('isPaid')
			return (
				<div className='ml-2'>
					{value ? (
						<CheckIcon className='size-4 text-emerald-500' />
					) : (
						<XIcon className='size-4 text-red-500' />
					)}
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
			const isPaid = row.getValue('isPaid')

			return (
				<Badge
					variant={!isPaid ? 'expense' : 'income'}
					className='px-3.5 py-2.5 text-xs font-medium'>
					{formatCurrency(amount)}
				</Badge>
			)
		}
	},
	{
		id: 'actions',
		cell: ({ row }) => <TransactionsTableRowActions row={row} />
	}
]
