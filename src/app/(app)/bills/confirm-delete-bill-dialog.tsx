import { Trash2Icon } from 'lucide-react'

import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger
} from '@/components/ui/alert-dialog'
import { buttonVariants } from '@/components/ui/button'
import { DropdownMenuItem } from '@/components/ui/dropdown-menu'

type Props = {
	onClick: () => void
}

export function ConfirmDeleteBillDialog({ onClick }: Props) {
	return (
		<AlertDialog>
			<AlertDialogTrigger asChild>
				<DropdownMenuItem
					onSelect={(e) => {
						e.preventDefault()
					}}
					className='text-red-500'>
					<Trash2Icon className='mr-2 size-4' />
					<span>Delete Item</span>
				</DropdownMenuItem>
			</AlertDialogTrigger>
			<AlertDialogContent className='sm:max-w-[425px]'>
				<AlertDialogHeader>
					<AlertDialogTitle>Confirm Deletion</AlertDialogTitle>
					<AlertDialogDescription>
						Are you sure you want to delete this item?
						<br />
						This action cannot be undone.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>Cancel</AlertDialogCancel>
					<AlertDialogAction
						className={buttonVariants({ variant: 'destructive' })}
						onClick={onClick}>
						<Trash2Icon className='mr-2 size-4' />
						<span>Delete</span>
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	)
}
