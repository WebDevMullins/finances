import { db } from '@/server/db/index'
import { accounts, bills, categories } from '@/server/db/schema'
import { addMonths } from 'date-fns'
import { asc, eq } from 'drizzle-orm'
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
	categoryId
}: createBillParams) {
	try {
		const recurringId = isRecurring ? nanoid() : null

		await db.insert(bills).values({
			id: nanoid(),
			recurringId: recurringId,
			amount: amount,
			payee: payee,
			dueDate: dueDate,
			isRecurring: isRecurring,
			categoryId: categoryId
		})

		if (isRecurring) {
			// Create a recurring bill
			const numMonths = 11
			let currentDate = new Date(dueDate)

			for (let i = 0; i < numMonths; i++) {
				currentDate = addMonths(currentDate, 1)
				await db.insert(bills).values({
					id: nanoid(),
					recurringId: recurringId,
					amount: amount,
					payee: payee,
					dueDate: currentDate,
					isRecurring: true,
					categoryId: categoryId
				})
			}
		}
	} catch (error) {
		console.error('Error creating bill', error)
		throw error
	}
}

export async function getBills(userId: string) {
	const bill = await db
		.selectDistinct({
			id: bills.id,
			recurringId: bills.recurringId,
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
		.orderBy(asc(bills.dueDate))

	return { bill }
}

export async function deleteBill(
	billId: string,
	recurringId?: string,
	deleteAll?: boolean
) {
	try {
		if (deleteAll) {
			await db.delete(bills).where(eq(bills.recurringId, recurringId ?? ''))
		} else {
			await db.delete(bills).where(eq(bills.id, billId))
		}
	} catch (error) {
		console.error('Error deleting bill', error)
		throw error
	}
}
