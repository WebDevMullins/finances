import { toast } from 'sonner'
import { useServerAction } from 'zsa-react'

import { deleteBillAction } from '../actions'
import { ConfirmDeleteBillDialog } from '../confirm-delete-bill-dialog'

type Props = {
	billId: string
	recurringId?: string | undefined
	deleteRecurring?: boolean
}

export function DeleteBillItem({
	billId,
	recurringId,
	deleteRecurring
}: Props) {
	const { execute, error } = useServerAction(deleteBillAction)

	async function deleteBill() {
		await execute({ billId, recurringId, deleteRecurring })

		if (error) {
			console.error('Error deleting bill', error)
			toast.error('Error deleting bill')
			return
		}
		console.log(
			'Bill deleted info: ',
			'BillId: ',
			billId,
			'RecurringId: ',
			recurringId,
			'DeleteRecurring: ',
			deleteRecurring
		)

		toast.success('Bill deleted')
	}

	return <ConfirmDeleteBillDialog onClick={deleteBill} />
}
