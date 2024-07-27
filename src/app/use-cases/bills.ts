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
	deleteAll?: boolean
}

export async function deleteBillUseCase({
	billId,
	recurringId,
	deleteAll
}: deleteBillParams) {
	await deleteBill(billId, recurringId, deleteAll)
}
