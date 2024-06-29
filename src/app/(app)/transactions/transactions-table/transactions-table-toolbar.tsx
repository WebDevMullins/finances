'use client'

import { type Table } from '@tanstack/react-table'
import { CrossIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
// import { priorities, statuses } from '../data/data'

// import { TransactionsTableFacetedFilter } from './transactions-table-faceted-filter'
import { TransactionsTableViewOptions } from './transactions-table-view-options'

interface TransactionsTableToolbarProps<TData> {
	table: Table<TData>
}

export function TransactionsTableToolbar<TData>({
	table
}: TransactionsTableToolbarProps<TData>) {
	const isFiltered = table.getState().columnFilters.length > 0

	return (
		<div className='flex items-center justify-between'>
			<div className='flex flex-1 items-center space-x-2'>
				<Input
					placeholder='Filter name...'
					value={(table.getColumn('name')?.getFilterValue() as string) ?? ''}
					onChange={(event) =>
						table.getColumn('name')?.setFilterValue(event.target.value)
					}
					className='h-8 w-[150px] lg:w-[250px]'
				/>
				{/* {table.getColumn('status') && (
					<TransactionsTableFacetedFilter
						column={table.getColumn('status')}
						title='Status'
						options={statuses}
					/>
				)}
				{table.getColumn('priority') && (
					<TransactionsTableFacetedFilter
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
			<TransactionsTableViewOptions table={table} />
		</div>
	)
}
