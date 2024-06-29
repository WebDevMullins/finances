import { Trash2Icon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger
} from '@/components/ui/dialog'
import { DropdownMenuItem } from '@/components/ui/dropdown-menu'

type Props = {
	onClick: () => void
}

export function ConfirmDeleteDialog({ onClick }: Props) {
	return (
		<Dialog modal={true}>
			<DialogTrigger asChild>
				<DropdownMenuItem
					onSelect={(e) => {
						e.preventDefault()
					}}
					className='text-red-500'>
					<Trash2Icon className='mr-2 size-4' />
					<span>Delete Item</span>
				</DropdownMenuItem>
			</DialogTrigger>
			<DialogContent className='sm:max-w-[425px]'>
				<DialogHeader>
					<DialogTitle>Confirm Deletion</DialogTitle>
					<DialogDescription>
						Are you sure you want to delete this item?
						<br />
						This action cannot be undone.
					</DialogDescription>
				</DialogHeader>
				<DialogFooter>
					<DialogClose asChild>
						<Button variant={'outline'}>Cancel</Button>
					</DialogClose>
					<DialogClose asChild>
						<Button
							variant={'destructive'}
							onClick={onClick}>
							<Trash2Icon className='mr-2 size-4' />
							<span>Delete</span>
						</Button>
					</DialogClose>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}
