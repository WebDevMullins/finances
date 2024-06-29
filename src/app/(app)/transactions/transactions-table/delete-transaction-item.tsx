import { toast } from 'sonner'
import { useServerAction } from 'zsa-react'

import { DropdownMenuItem } from '@/components/ui/dropdown-menu'

import { Trash2Icon } from 'lucide-react'
import { deleteTransactionAction } from '../actions'

type Props = {
	transactionId: string
}

export function DeleteTransactionItem({ transactionId }: Props) {
	const { execute, error } = useServerAction(deleteTransactionAction)

	async function deleteTransaction() {
		await execute(transactionId)

		if (error) {
			console.error('Error creating transaction', error)
			toast.error('Error creating transaction')
			return
		}

		toast.success('Transaction deleted')
	}

	return (
		<DropdownMenuItem
			onClick={() => deleteTransaction()}
			className='text-red-500'>
			<Trash2Icon className='mr-2 size-4' />
			<span>Delete Transaction</span>
		</DropdownMenuItem>
	)
}
