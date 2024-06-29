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
			console.error('Error deleting transaction', error)
			toast.error('Error deleting transaction')
			return
		}

		toast.success('Transaction deleted')
	}

	return <ConfirmDeleteDialog onClick={deleteTransaction} />
}
