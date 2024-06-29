'use client'

import { PlusCircleIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'

import { useNewAccount } from './hooks/use-new-account'

export default function CreateAccountButton() {
	const { onOpen } = useNewAccount()

	return (
		<Button
			variant={'outline'}
			onClick={onOpen}>
			<PlusCircleIcon className='mr-2 size-4' />
			New
		</Button>
	)
}
