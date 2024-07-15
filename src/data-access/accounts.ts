import { db } from '@/server/db/index'
import { accounts, transactions } from '@/server/db/schema'
import { eq, sql } from 'drizzle-orm'
import { nanoid } from 'nanoid'

type createAccountParams = {
	name: string
	userId: string
	plaidId: string
	startingBalance: number
}

export async function createAccount({
	name,
	userId,
	plaidId,
	startingBalance
}: createAccountParams) {
	try {
		await db.insert(accounts).values({
			id: nanoid(),
			name: name,
			userId: userId,
			plaidId: plaidId,
			startingBalance: startingBalance
		})
	} catch (error) {
		console.error('Error creating account', error)
		throw error
	}
}

export async function getAccounts(userId: string) {
	const account = await db
		.select({
			id: accounts.id,
			name: accounts.name,
			userId: accounts.userId,
			plaidId: accounts.plaidId,
			startingBalance: accounts.startingBalance,
			balance:
				sql`${accounts.startingBalance} + SUM(${transactions.amount})`.as(
					'balance'
				)
		})
		.from(accounts)
		.leftJoin(transactions, eq(transactions.accountId, accounts.id))
		.where(eq(accounts.userId, userId))
		.groupBy(accounts.id, accounts.name)
		.orderBy(accounts.name)

	return { account }
}

export async function deleteAccount(id: string) {
	await db.delete(accounts).where(eq(accounts.id, id))
}
