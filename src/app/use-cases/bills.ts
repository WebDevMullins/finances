import { deleteBill, getBills } from '@/data-access/bills'

export async function getBillsUseCase(userId: string) {
	// if (!userId) {
	// 	throw new Error('User not found')
	// }

	const bills = await getBills(userId)

	return bills
}

export async function deleteBillUseCase(id: string) {
	await deleteBill(id)
}
