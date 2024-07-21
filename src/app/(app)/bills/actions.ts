'use server'

import { revalidatePath } from 'next/cache'
import { z } from 'zod'

import { deleteBillUseCase, getBillsUseCase } from '@/app/use-cases/bills'
import { createBill } from '@/data-access/bills'
import { authenticatedAction } from '@/lib/safe-action'

export const createBillAction = authenticatedAction
	.createServerAction()
	.input(
		z.object({
			amount: z.number(),
			payee: z.string().min(1),
			dueDate: z.coerce.date(),
			isRecurring: z.boolean(),
			categoryId: z.string().min(1)
		})
	)
	.onError(async (error) => {
		console.error('Error creating bill', error)
	})
	.handler(async ({ input }) => {
		try {
			await createBill({
				amount: input.amount,
				payee: input.payee,
				dueDate: input.dueDate,
				isRecurring: input.isRecurring,
				categoryId: input.categoryId
			})
		} catch (error) {
			console.error('Error creating bill', error)
			throw error
		}

		revalidatePath('/bills')
	})

export const getBillsAction = authenticatedAction
	.createServerAction()
	.onError(async (err) => {
		console.error('Error fetching bills', err)
	})
	.handler(async ({ ctx }) => {
		const bills = await getBillsUseCase(ctx.userId!)
		return bills
	})

export const deleteBillAction = authenticatedAction
	.createServerAction()
	.input(
		z.object({
			billId: z.string(),
			recurringId: z.string().optional(),
			deleteRecurring: z.boolean().optional()
		})
	)
	.onError(async () => {
		console.error('Error deleting bill')
	})
	.handler(async ({ input }) => {
		try {
			await deleteBillUseCase(input)
		} catch (err) {
			console.error('Error deleting bill', err)
			throw err
		}

		revalidatePath('/bills')
	})
