import { toast } from 'sonner'
import { useServerAction } from 'zsa-react'

import { ConfirmDeleteDialog } from '@/components/confirm-delete-dialog'

import { deleteCategoryAction } from '../actions'

type Props = {
	categoryId: string
}

export function DeleteCategoryItem({ categoryId }: Props) {
	const { execute, error } = useServerAction(deleteCategoryAction)

	async function deleteCategory() {
		await execute(categoryId)

		if (error) {
			console.error('Error deleting category', error)
			toast.error('Error deleting category')
			return
		}

		toast.success('Category deleted')
	}

	return <ConfirmDeleteDialog onClick={deleteCategory} />
}
