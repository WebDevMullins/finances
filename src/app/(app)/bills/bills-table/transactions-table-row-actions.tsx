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

import { TransactionSchema } from '@/server/db/schema'
import { DeleteTransactionItem } from './delete-transaction-item'

interface DataTableRowActionsProps<TData> {
	row: Row<TData>
}

export function TransactionsTableRowActions<TData>({
	row
}: DataTableRowActionsProps<TData>) {
	const transaction = TransactionSchema.parse(row.original)

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
				<DropdownMenuLabel>{transaction.payee}</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuItem>View transaction details</DropdownMenuItem>
				<DropdownMenuSeparator />
				<DeleteTransactionItem transactionId={transaction.id} />
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
