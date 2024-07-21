import { db } from '@/server/db/index'
import { accounts, bills, categories } from '@/server/db/schema'
import { desc, eq } from 'drizzle-orm'
import { nanoid } from 'nanoid'

type createBillParams = {
	amount: number
	payee: string
	dueDate: Date
	isRecurring: boolean
	categoryId: string
}

export async function createBill({
	amount,
	payee,
	dueDate,
	isRecurring,
	// isPaid,
	categoryId
}: createBillParams) {
	try {
		await db.insert(bills).values({
			id: nanoid(),
			amount: amount,
			payee: payee,
			dueDate: dueDate,
			isRecurring: isRecurring,
			categoryId: categoryId
		})
	} catch (error) {
		console.error('Error creating bill', error)
		throw error
	}
}

export async function getBills(userId: string) {
	const bill = await db
		.selectDistinct({
			id: bills.id,
			amount: bills.amount,
			payee: bills.payee,
			dueDate: bills.dueDate,
			isRecurring: bills.isRecurring,
			isPaid: bills.isPaid,
			categoryId: bills.categoryId,
			category: categories.name,
			transactionId: bills.transactionId
		})
		.from(bills)
		.leftJoin(categories, eq(bills.categoryId, categories.id))
		.innerJoin(accounts, eq(accounts.userId, userId))
		.orderBy(desc(bills.dueDate))

	return { bill }
}

export async function deleteBill(id: string) {
	await db.delete(bills).where(eq(bills.id, id))
}
