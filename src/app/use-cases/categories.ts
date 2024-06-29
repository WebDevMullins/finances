import { deleteCategory, getCategories } from '@/data-access/categories'

export async function getCategoriesUseCase(userId: string) {
	const categories = await getCategories(userId)

	return categories
}

export async function deleteCategoryUseCase(id: string) {
	await deleteCategory(id)
}
