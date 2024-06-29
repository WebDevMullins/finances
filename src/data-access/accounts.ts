import { db } from '@/server/db/index'
import { accounts } from '@/server/db/schema'
import { eq } from 'drizzle-orm'
import { nanoid } from 'nanoid'

type createAccountParams = {
	name: string
	type: string
	userId: string
	plaidId: string
	balance: number
}

export async function createAccount({
	name,
	type,
	userId,
	plaidId,
	balance
}: createAccountParams) {
	try {
		await db.insert(accounts).values({
			id: nanoid(),
			name: name,
			type: type,
			userId: userId,
			plaidId: plaidId,
			balance: balance,
			createdAt: new Date(),
			updatedAt: new Date()
		})
	} catch (error) {
		console.error('Error creating account', error)
		throw error
	}
}

export async function getAccounts(userId: string) {
	const account = await db.query.accounts.findMany({
		where: eq(accounts.userId, userId)
	})

	return { account }
}

export async function deleteAccount(id: string) {
	await db.delete(accounts).where(eq(accounts.id, id))
}
