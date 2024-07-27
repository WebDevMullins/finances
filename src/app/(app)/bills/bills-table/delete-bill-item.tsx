import { toast } from 'sonner'
import { useServerAction } from 'zsa-react'

import { deleteBillAction } from '../actions'
import { ConfirmDeleteBillDialog } from '../confirm-delete-bill-dialog'

type Props = {
	billId: string
	recurringId?: string | undefined
	isRecurring?: boolean
	deleteAll?: boolean
}

export function DeleteBillItem({ billId, recurringId, isRecurring }: Props) {
	const { execute, error } = useServerAction(deleteBillAction)

	async function deleteBill(deleteAll?: boolean) {
		await execute({ billId, recurringId, isRecurring, deleteAll })

		if (error) {
			console.error('Error deleting bill', error)
			toast.error('Error deleting bill')
			return
		}

		toast.success(deleteAll ? 'Recurring bills deleted' : 'Bill deleted')
	}

	return (
		<ConfirmDeleteBillDialog
			onClick={deleteBill}
			isRecurring={isRecurring}
		/>
	)
}
