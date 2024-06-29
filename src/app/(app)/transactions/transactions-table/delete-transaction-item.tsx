import { toast } from 'sonner'
import { useServerAction } from 'zsa-react'

import { ConfirmDeleteDialog } from '@/components/confirm-delete-dialog'

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

	return <ConfirmDeleteDialog onClick={deleteTransaction} />
}
