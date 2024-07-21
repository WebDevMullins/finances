'use client'

import { NewAccountSheet } from '@/app/(app)/accounts/new-account-sheet'
import { NewBillSheet } from '@/app/(app)/bills/new-bill-sheet'
import { NewCategorySheet } from '@/app/(app)/categories/new-category-sheet'
import { NewTransactionSheet } from '@/app/(app)/transactions/new-transaction-sheet'
import { useMountedState } from 'react-use'

export default function SheetProvider() {
	const isMounted = useMountedState()

	if (!isMounted) {
		return null
	}

	return (
		<>
			<NewAccountSheet />

			<NewBillSheet />

			<NewCategorySheet />

			<NewTransactionSheet />
		</>
	)
}
