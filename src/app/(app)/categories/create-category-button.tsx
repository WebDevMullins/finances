'use client'

import { PlusCircleIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'

import { useNewCategory } from './hooks/use-new-category'

export default function CreateCategoryButton() {
	const { onOpen } = useNewCategory()

	return (
		<Button
			variant={'outline'}
			onClick={onOpen}>
			<PlusCircleIcon className='mr-2 size-4' />
			New
		</Button>
	)
}
