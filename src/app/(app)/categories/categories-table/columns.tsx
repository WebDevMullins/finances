'use client'

import { type ColumnDef } from '@tanstack/react-table'

import { type Category } from '@/lib/types'

import { Checkbox } from '@/components/ui/checkbox'
import { DataTableColumnHeader } from '../../../../components/data-table/data-table-column-headers'
import { DataTableRowActions } from './categories-table-row-actions'

export const columns: ColumnDef<Category>[] = [
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
	// {
	// 	accessorKey: 'type',
	// 	header: ({ column }) => (
	// 		<DataTableColumnHeader
	// 			column={column}
	// 			title='Type'
	// 		/>
	// 	),
	// 	cell: ({ row }) => <div className='capitalize'>{row.getValue('type')}</div>
	// },
	// {
	// 	accessorKey: 'amount',
	// 	header: ({ column }) => (
	// 		<DataTableColumnHeader
	// 			column={column}
	// 			title='Amount'
	// 		/>
	// 	),
	// 	cell: ({ row }) => {
	// 		const amount = parseFloat(row.getValue('amount'))

	// 		// Format the amount as a dollar amount
	// 		const formatted = new Intl.NumberFormat('en-US', {
	// 			style: 'currency',
	// 			currency: 'USD'
	// 		}).format(amount)

	// 		return <div className='font-medium'>{formatted}</div>
	// 	}
	// },
	{
		id: 'actions',
		cell: ({ row }) => <DataTableRowActions row={row} />
	}
]
