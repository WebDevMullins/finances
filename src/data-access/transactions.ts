import { db } from '@/server/db/index'
import { accounts, categories, transactions } from '@/server/db/schema'
import { and, desc, eq } from 'drizzle-orm'
import { nanoid } from 'nanoid'

type createTransactionParams = {
	amount: number
	payee: string
	date: Date
	accountId: string
	categoryId: string
}

export async function createTransaction({
	date,
	payee,
	accountId,
	categoryId,
	amount
}: createTransactionParams) {
	try {
		await db.insert(transactions).values({
			id: nanoid(),
			amount: amount,
			payee: payee,
			date: date,
			accountId: accountId,
			categoryId: categoryId
		})
		console.log('Transaction created', date)
	} catch (error) {
		console.error('Error creating transaction', error)
		throw error
	}
}

export async function getTransactions(userId: string) {
	const transaction = await db
		.select({
			id: transactions.id,
			amount: transactions.amount,
			payee: transactions.payee,
			date: transactions.date,
			account: accounts.name,
			accountId: transactions.accountId,
			category: categories.name,
			categoryId: transactions.categoryId
		})
		.from(transactions)
		.innerJoin(accounts, eq(transactions.accountId, accounts.id))
		.leftJoin(categories, eq(transactions.categoryId, categories.id))
		.where(
			and(
				accounts.id ? eq(transactions.accountId, accounts.id) : undefined,
				eq(accounts.userId, userId)
			)
		)
		.orderBy(desc(transactions.date))
	return { transaction }
}

export async function deleteTransaction(id: string) {
	await db.delete(transactions).where(eq(transactions.id, id))
}
