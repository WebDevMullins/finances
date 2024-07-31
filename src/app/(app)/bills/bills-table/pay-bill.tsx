import { toast } from 'sonner'
import { useServerAction } from 'zsa-react'

import { payBillAction } from '../actions'
import { PayBillDialog } from '../pay-bill-dialog'

type Props = {
	billId: string
	recurringId?: string | undefined
	isRecurring?: boolean
	deleteAll?: boolean
}

export function PayBill({ billId, recurringId, isRecurring }: Props) {
	const { execute, error } = useServerAction(payBillAction)

	async function payBill(deleteAll?: boolean) {
		await execute({ billId, recurringId, isRecurring, deleteAll })

		if (error) {
			console.error('Error deleting bill', error)
			toast.error('Error deleting bill')
			return
		}

		toast.success(deleteAll ? 'Recurring bills deleted' : 'Bill deleted')
	}

	return (
		<PayBillDialog
			title='Pay Bill'
			description='Enter details of the bill to be paid.'>
			Form goes here
		</PayBillDialog>
	)
}
