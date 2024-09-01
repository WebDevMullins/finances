import {
	deleteTransaction,
	getTransactions,
	getTransactionsByDateRange
} from '@/data-access/transactions'

export async function getTransactionsUseCase(userId: string) {
	// if (!userId) {
	// 	throw new Error('User not found')
	// }

	const transactions = await getTransactions(userId)

	return transactions
}

export async function getTransactionsByDateRangeUseCase(from: Date, to: Date) {
	const transactions = await getTransactionsByDateRange(from, to)
	
	return transactions
}

export async function deleteTransactionUseCase(id: string) {
	await deleteTransaction(id)
}
