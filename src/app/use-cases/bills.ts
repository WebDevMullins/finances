import { deleteBill, getBills } from '@/data-access/bills'

export async function getBillsUseCase(userId: string) {
	// if (!userId) {
	// 	throw new Error('User not found')
	// }

	const bills = await getBills(userId)

	return bills
}

type deleteBillParams = {
	billId: string
	recurringId?: string
	deleteRecurring?: boolean
}

export async function deleteBillUseCase({
	billId,
	recurringId,
	deleteRecurring
}: deleteBillParams) {
	await deleteBill(billId, recurringId, deleteRecurring)
}
