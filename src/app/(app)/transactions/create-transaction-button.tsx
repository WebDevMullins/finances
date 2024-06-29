'use client'

import { PlusCircleIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'

import { useNewTransaction } from './hooks/use-new-transaction'

export default function CreateTransactionButton() {
	const { onOpen } = useNewTransaction()

	return (
		<Button
			variant={'outline'}
			onClick={onOpen}>
			<PlusCircleIcon className='mr-2 size-4' />
			New
		</Button>
	)
}
