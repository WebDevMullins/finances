import { deleteCategory, getCategories } from '@/data-access/categories'

export async function getCategoriesUseCase() {
	const categories = await getCategories()

	return categories
}

export async function deleteCategoryUseCase(id: string) {
	await deleteCategory(id)
}
