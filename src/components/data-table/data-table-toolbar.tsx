'use client'

import { type Table } from '@tanstack/react-table'
import { CrossIcon, Trash2Icon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
// import { priorities, statuses } from '../data/data'

// import { DataTableFacetedFilter } from './transactions-table-faceted-filter'
import { DataTableViewOptions } from './data-table-view-options'

interface DataTableToolbarProps<TData> {
	table: Table<TData>
	filterKey: string
}

export function DataTableToolbar<TData>({
	table,
	filterKey
}: DataTableToolbarProps<TData>) {
	const isFiltered = table.getState().columnFilters.length > 0

	return (
		<div className='flex items-center justify-between'>
			<div className='flex flex-1 items-center space-x-2'>
				<Input
					placeholder={`Filter ${filterKey}...`}
					value={(table.getColumn(filterKey)?.getFilterValue() as string) ?? ''}
					onChange={(event) =>
						table.getColumn(filterKey)?.setFilterValue(event.target.value)
					}
					className='h-8 w-[150px] lg:w-[250px]'
				/>
				{/* {table.getColumn('status') && (
					<DataTableFacetedFilter
						column={table.getColumn('status')}
						title='Status'
						options={statuses}
					/>
				)}
				{table.getColumn('priority') && (
					<DataTableFacetedFilter
						column={table.getColumn('priority')}
						title='Priority'
						options={priorities}
					/>
				)} */}

				{isFiltered && (
					<Button
						variant='ghost'
						onClick={() => table.resetColumnFilters()}
						className='h-8 px-2 lg:px-3'>
						Reset
						<CrossIcon className='ml-2 h-4 w-4' />
					</Button>
				)}
			</div>
			<div className='flex items-center space-x-2'>
				{table.getFilteredSelectedRowModel().rows.length > 0 && (
					<Button
						size='sm'
						variant='destructive'
						className='h-8 px-2 lg:px-3'>
						<Trash2Icon className='mr-2 size-4' />
						Delete {table.getFilteredSelectedRowModel().rows.length} items
					</Button>
				)}
				<DataTableViewOptions table={table} />
			</div>
		</div>
	)
}
