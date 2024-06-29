'use server'

import { revalidatePath } from 'next/cache'
import { z } from 'zod'

import {
	getTransactionsUseCase,
	deleteTransactionUseCase
} from '@/app/use-cases/transactions'
import { createTransaction } from '@/data-access/transactions'
import { authenticatedAction } from '@/lib/safe-action'

export const createTransactionAction = authenticatedAction
	.createServerAction()
	.input(
		z.object({
			name: z.string().min(1),
			type: z.enum(['income', 'expense']),
			amount: z.number().min(1)
		})
	)
	.onError(async () => {
		console.error('Error creating transaction')
	})
	.handler(async ({ input, ctx }) => {
		try {
			await createTransaction({
				name: input.name,
				type: input.type,
				userId: ctx.userId!,
				plaidId: '123',
				amount: input.amount
			})
		} catch (error) {
			console.error('Error creating transaction', error)
			throw error
		}

		revalidatePath('/transactions')
	})

export const getTransactionsAction = authenticatedAction
	.createServerAction()
	.input(z.string())
	.onError(async () => {
		console.error('Error fetching transactions')
	})
	.handler(async ({ input }) => {
		const transactions = await getTransactionsUseCase(input)
		return transactions
	})

export const deleteTransactionAction = authenticatedAction
	.createServerAction()
	.input(z.string())
	.onError(async () => {
		console.error('Error deleting transaction')
	})
	.handler(async ({ input }) => {
		try {
			await deleteTransactionUseCase(input)
		} catch (err) {
			console.error('Error deleting transaction', err)
			throw err
		}

		revalidatePath('/transactions')
	})
