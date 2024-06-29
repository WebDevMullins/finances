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

import { AccountSchema } from '@/server/db/schema'
import { DeleteAccountItem } from './delete-account-item'

interface DataTableRowActionsProps<TData> {
	row: Row<TData>
}

export function AccountsTableRowActions<TData>({
	row
}: DataTableRowActionsProps<TData>) {
	const account = AccountSchema.parse(row.original)

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
				<DropdownMenuLabel>{account.name}</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuItem>View account details</DropdownMenuItem>
				<DropdownMenuSeparator />
				<DeleteAccountItem accountId={account.id} />
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
