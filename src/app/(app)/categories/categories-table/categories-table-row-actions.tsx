'use client'

import { type Row } from '@tanstack/react-table'
import { MoreHorizontalIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'

import { CategorySchema } from '@/server/db/schema'
import { DeleteCategoryItem } from './delete-category-item'

interface DataTableRowActionsProps<TData> {
	row: Row<TData>
}

export function DataTableRowActions<TData>({
	row
}: DataTableRowActionsProps<TData>) {
	const category = CategorySchema.parse(row.original)

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					variant='ghost'
					className='h-8 w-8 p-0'>
					<span className='sr-only'>Open menu</span>
					<MoreHorizontalIcon className='h-4 w-4' />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align='end'>
				<DropdownMenuLabel>{category.name}</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuItem>View category details</DropdownMenuItem>
				<DropdownMenuSeparator />
				<DeleteCategoryItem categoryId={category.id} />
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
