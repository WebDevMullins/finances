import { toast } from 'sonner'
import { useServerAction } from 'zsa-react'

import { ConfirmDeleteDialog } from '@/components/confirm-delete-dialog'

import { deleteBillAction } from '../actions'

type Props = {
	billId: string
}

export function DeleteBillItem({ billId }: Props) {
	const { execute, error } = useServerAction(deleteBillAction)

	async function deleteBill() {
		await execute(billId)

		if (error) {
			console.error('Error deleting bill', error)
			toast.error('Error deleting bill')
			return
		}

		toast.success('Bill deleted')
	}

	return <ConfirmDeleteDialog onClick={deleteBill} />
}
