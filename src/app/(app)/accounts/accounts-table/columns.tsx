'use client'

import { type ColumnDef } from '@tanstack/react-table'

import { type Account } from '@/lib/types'

import { Checkbox } from '@/components/ui/checkbox'

import { AccountsTableColumnHeader } from './accounts-table-column-headers'
import { AccountsTableRowActions } from './accounts-table-row-actions'

export const columns: ColumnDef<Account>[] = [
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
		accessorKey: 'name',
		header: ({ column }) => (
			<AccountsTableColumnHeader
				column={column}
				title='Name'
			/>
		),
		cell: ({ row }) => {
			// const label = labels.find((label) => label.value === row.original.label)

			return (
				<div className='flex space-x-2'>
					{/* {label && <Badge variant="outline">{label.label}</Badge>} */}
					<span className='max-w-[500px] truncate font-medium'>
						{row.getValue('name')}
					</span>
				</div>
			)
		}
	},
	{
		accessorKey: 'type',
		header: ({ column }) => (
			<AccountsTableColumnHeader
				column={column}
				title='Type'
			/>
		),
		cell: ({ row }) => <div className='capitalize'>{row.getValue('type')}</div>
	},
	{
		accessorKey: 'balance',
		header: ({ column }) => (
			<AccountsTableColumnHeader
				column={column}
				title='Balance'
			/>
		),
		cell: ({ row }) => {
			const balance = parseFloat(row.getValue('balance'))

			// Format the amount as a dollar amount
			const formatted = new Intl.NumberFormat('en-US', {
				style: 'currency',
				currency: 'USD'
			}).format(balance)

			return <div className='font-medium'>{formatted}</div>
		}
	},
	{
		id: 'actions',
		cell: ({ row }) => <AccountsTableRowActions row={row} />
	}
]
