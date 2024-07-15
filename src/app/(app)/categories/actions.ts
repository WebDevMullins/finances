'use server'

import { revalidatePath } from 'next/cache'
import { z } from 'zod'

import {
	deleteCategoryUseCase,
	getCategoriesUseCase
} from '@/app/use-cases/categories'
import { createCategory } from '@/data-access/categories'
import { authenticatedAction } from '@/lib/safe-action'

export const createCategoryAction = authenticatedAction
	.createServerAction()
	.input(
		z.object({
			name: z.string().min(1)
		})
	)
	.onError(async () => {
		console.error('Error creating category')
	})
	.handler(async ({ input }) => {
		try {
			await createCategory({
				name: input.name
			})
		} catch (error) {
			console.error('Error creating category', error)
			throw error
		}

		revalidatePath('/categories')
	})

export const getCategoriesAction = authenticatedAction
	.createServerAction()
	.onError(async () => {
		console.error('Error fetching categories')
	})
	.handler(async () => {
		const categories = await getCategoriesUseCase()
		return categories
	})

export const deleteCategoryAction = authenticatedAction
	.createServerAction()
	.input(z.string())
	.onError(async () => {
		console.error('Error deleting category')
	})
	.handler(async ({ input }) => {
		try {
			await deleteCategoryUseCase(input)
		} catch (err) {
			console.error('Error deleting category', err)
			throw err
		}

		revalidatePath('/categories')
	})
