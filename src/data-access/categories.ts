import { db } from '@/server/db/index'
import { categories } from '@/server/db/schema'
import { eq } from 'drizzle-orm'
import { nanoid } from 'nanoid'

type createCategoryParams = {
	name: string
	userId: string
}

export async function createCategory({ name, userId }: createCategoryParams) {
	try {
		await db.insert(categories).values({
			id: nanoid(),
			name: name,
			userId: userId,
			createdAt: new Date(),
			updatedAt: new Date()
		})
	} catch (error) {
		console.error('Error creating category', error)
		throw error
	}
}

export async function getCategories(userId: string) {
	const category = await db.query.categories.findMany({
		where: eq(categories.userId, userId)
	})

	return { category }
}

export async function deleteCategory(id: string) {
	await db.delete(categories).where(eq(categories.id, id))
}
