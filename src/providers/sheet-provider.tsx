'use client'

import { NewAccountSheet } from '@/app/(app)/accounts/new-account-sheet'
import { NewCategorySheet } from '@/app/(app)/categories/new-category-sheet'
import { NewTransactionSheet } from '@/app/(app)/transactions/new-account-sheet'
import { useMountedState } from 'react-use'

export default function SheetProvider() {
	const isMounted = useMountedState()

	if (!isMounted) {
		return null
	}

	return (
		<>
			<NewAccountSheet />

			<NewTransactionSheet />

			<NewCategorySheet />
		</>
	)
}
