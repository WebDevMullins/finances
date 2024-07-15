'use server'

import { revalidatePath } from 'next/cache'
import { z } from 'zod'

import {
	deleteTransactionUseCase,
	getTransactionsUseCase
} from '@/app/use-cases/transactions'
import { createTransaction } from '@/data-access/transactions'
import { authenticatedAction } from '@/lib/safe-action'

export const createTransactionAction = authenticatedAction
	.createServerAction()
	.input(
		z.object({
			amount: z.number(),
			payee: z.string().min(1),
			date: z.coerce.date(),
			accountId: z.string().min(1),
			categoryId: z.string().min(1)
		})
	)
	.onError(async (error) => {
		console.error('Error creating transaction', error)
	})
	.handler(async ({ input }) => {
		try {
			await createTransaction({
				amount: input.amount,
				payee: input.payee,
				date: input.date,
				accountId: input.accountId,
				categoryId: input.categoryId
			})
		} catch (error) {
			console.error('Error creating transaction', error)
			throw error
		}

		revalidatePath('/transactions')
	})

export const getTransactionsAction = authenticatedAction
	.createServerAction()
	.onError(async () => {
		console.error('Error fetching transactions')
	})
	.handler(async ({ ctx }) => {
		const transactions = await getTransactionsUseCase(ctx.userId!)
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
