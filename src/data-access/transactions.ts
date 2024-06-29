import { db } from '@/server/db/index'
import { transactions } from '@/server/db/schema'
import { eq } from 'drizzle-orm'
import { nanoid } from 'nanoid'

import { type TransactionType } from '@/lib/types'

type createTransactionParams = {
	name: string
	type: TransactionType
	userId: string
	plaidId: string
	amount: number
}

export async function createTransaction({
	name,
	type,
	userId,
	plaidId,
	amount
}: createTransactionParams) {
	try {
		await db.insert(transactions).values({
			id: nanoid(),
			name: name,
			type: type,
			userId: userId,
			plaidId: plaidId,
			amount: amount,
			createdAt: new Date(),
			updatedAt: new Date()
		})
	} catch (error) {
		console.error('Error creating transaction', error)
		throw error
	}
}

export async function getTransactions(userId: string) {
	const transaction = await db.query.transactions.findMany({
		where: eq(transactions.userId, userId)
	})

	return { transaction }
}

export async function deleteTransaction(id: string) {
	await db.delete(transactions).where(eq(transactions.id, id))
}
