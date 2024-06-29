'use client'

import { useState } from 'react'

import {
	flexRender,
	getCoreRowModel,
	getFacetedRowModel,
	getFacetedUniqueValues,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	useReactTable,
	type ColumnDef,
	type ColumnFiltersState,
	type SortingState,
	type VisibilityState
} from '@tanstack/react-table'

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow
} from '@/components/ui/table'
import { TransactionsTablePagination } from './transactions-table-pagination'
import { TransactionsTableToolbar } from './transactions-table-toolbar'

interface DataTableProps<TData, TValue> {
	columns: ColumnDef<TData, TValue>[]
	data: TData[]
}

export function TransactionsTable<TData, TValue>({
	columns,
	data
}: DataTableProps<TData, TValue>) {
	const [rowSelection, setRowSelection] = useState({})
	const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
	const [sorting, setSorting] = useState<SortingState>([])

	const table = useReactTable({
		data,
		columns,
		state: {
			sorting,
			columnVisibility,
			rowSelection,
			columnFilters
		},
		enableRowSelection: true,
		onRowSelectionChange: setRowSelection,
		onSortingChange: setSorting,
		onColumnFiltersChange: setColumnFilters,
		onColumnVisibilityChange: setColumnVisibility,
		getCoreRowModel: getCoreRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getFacetedRowModel: getFacetedRowModel(),
		getFacetedUniqueValues: getFacetedUniqueValues()
	})

	return (
		<div className='min-w-[800px] space-y-4'>
			<TransactionsTableToolbar table={table} />
			{/* <div className='flex items-center justify-between py-4'>
				<div className='flex items-center gap-x-4'>
					<Input
						placeholder='Filter name...'
						value={(table.getColumn('name')?.getFilterValue() as string) ?? ''}
						onChange={(event) =>
							table.getColumn('name')?.setFilterValue(event.target.value)
						}
						className='max-w-sm'
					/>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button
								variant='outline'
								className='ml-auto'>
								Columns <ChevronDownIcon className='ml-2 h-4 w-4' />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align='end'>
							{table
								.getAllColumns()
								.filter((column) => column.getCanHide())
								.map((column) => {
									return (
										<DropdownMenuCheckboxItem
											key={column.id}
											className='capitalize'
											checked={column.getIsVisible()}
											onCheckedChange={(value) =>
												column.toggleVisibility(!!value)
											}>
											{column.id}
										</DropdownMenuCheckboxItem>
									)
								})}
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
				<CreateButton aria-label='Create new account' />
			</div> */}
			<div className='rounded-md border'>
				<Table>
					<TableHeader>
						{table.getHeaderGroups().map((headerGroup) => (
							<TableRow key={headerGroup.id}>
								{headerGroup.headers.map((header) => {
									return (
										<TableHead key={header.id}>
											{header.isPlaceholder
												? null
												: flexRender(
														header.column.columnDef.header,
														header.getContext()
													)}
										</TableHead>
									)
								})}
							</TableRow>
						))}
					</TableHeader>
					<TableBody>
						{table.getRowModel().rows?.length ? (
							table.getRowModel().rows.map((row) => (
								<TableRow
									key={row.id}
									data-state={row.getIsSelected() && 'selected'}>
									{row.getVisibleCells().map((cell) => (
										<TableCell key={cell.id}>
											{flexRender(
												cell.column.columnDef.cell,
												cell.getContext()
											)}
										</TableCell>
									))}
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell
									colSpan={columns.length}
									className='h-24 text-center'>
									No transactions found.
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>
			<TransactionsTablePagination table={table} />
		</div>
	)
}
