'use server'

import { revalidatePath } from 'next/cache'
import { z } from 'zod'

import {
	deleteAccountUseCase,
	getAccountsUseCase
} from '@/app/use-cases/accounts'
import { createAccount } from '@/data-access/accounts'
import { authenticatedAction } from '@/lib/safe-action'

export const createAccountAction = authenticatedAction
	.createServerAction()
	.input(
		z.object({
			name: z.string().min(1),
			startingBalance: z.number().min(1)
		})
	)
	.onError(async () => {
		console.error('Error creating account')
	})
	.handler(async ({ input, ctx }) => {
		try {
			await createAccount({
				name: input.name,
				userId: ctx.userId!,
				plaidId: '123',
				startingBalance: input.startingBalance
			})
		} catch (error) {
			console.error('Error creating account', error)
			throw error
		}

		revalidatePath('/accounts')
	})

export const getAccountsAction = authenticatedAction
	.createServerAction()
	.onError(async (err) => {
		console.error('Error fetching accounts', err)
	})
	.handler(async ({ ctx }) => {
		const accounts = await getAccountsUseCase(ctx.userId!)
		return accounts
	})

export const deleteAccountAction = authenticatedAction
	.createServerAction()
	.input(z.string())
	.onError(async () => {
		console.error('Error deleting account')
	})
	.handler(async ({ input }) => {
		try {
			await deleteAccountUseCase(input)
		} catch (err) {
			console.error('Error deleting account', err)
			throw err
		}

		revalidatePath('/accounts')
	})
