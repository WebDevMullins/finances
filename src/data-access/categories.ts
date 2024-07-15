import { db } from '@/server/db/index'
import { categories, transactions } from '@/server/db/schema'
import { eq, sql } from 'drizzle-orm'
import { nanoid } from 'nanoid'

type createCategoryParams = {
	name: string
}

export async function createCategory({ name }: createCategoryParams) {
	try {
		await db.insert(categories).values({
			id: nanoid(),
			name: name
		})
	} catch (error) {
		console.error('Error creating category', error)
		throw error
	}
}

export async function getCategories() {
	const category = await db
		.select({
			id: categories.id,
			name: categories.name,
			balance: sql`SUM(${transactions.amount})`.as('balance')
		})
		.from(categories)
		.leftJoin(transactions, eq(transactions.categoryId, categories.id))
		.groupBy(categories.id, categories.name)
		.orderBy(categories.name)
	return { category }
}

export async function deleteCategory(id: string) {
	await db.delete(categories).where(eq(categories.id, id))
}
