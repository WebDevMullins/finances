'use client'

import { type ColumnDef } from '@tanstack/react-table'

import { type Account } from '@/lib/types'

import { DataTableColumnHeader } from '@/components/data-table/data-table-column-headers'
import { Checkbox } from '@/components/ui/checkbox'

import { Badge } from '@/components/ui/badge'
import { formatCurrency } from '@/lib/utils'
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
			<DataTableColumnHeader
				column={column}
				title='Name'
			/>
		),
		cell: ({ row }) => {
			return (
				<div className='flex space-x-2'>
					<span className='max-w-[500px] truncate font-medium'>
						{row.getValue('name')}
					</span>
				</div>
			)
		}
	},
	{
		accessorKey: 'balance',
		header: ({ column }) => (
			<DataTableColumnHeader
				column={column}
				title='Balance'
			/>
		),
		cell: ({ row }) => {
			let balance = parseFloat(row.getValue('balance'))

			if (isNaN(balance)) {
				balance = row.original.startingBalance
			}

			return (
				<Badge
					variant={balance < 0 ? 'expense' : 'income'}
					className='px-3.5 py-2.5 text-xs font-medium'>
					{formatCurrency(balance)}
				</Badge>
			)
		}
	},
	{
		id: 'actions',
		cell: ({ row }) => <AccountsTableRowActions row={row} />
	}
]
