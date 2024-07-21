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
import { Checkbox } from '@/components/ui/checkbox'
import { DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { useState } from 'react'

type Props = {
	onClick: () => void
}

export function ConfirmDeleteBillDialog({ onClick }: Props) {
	const [deleteAll, setDeleteAll] = useState(false)
	console.log('DeleteAll: ', deleteAll)

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
					<Checkbox
						checked={deleteAll}
						onCheckedChange={(checked) => {
							setDeleteAll(checked === !deleteAll)
						}}
					/>
					Delete All Recurring Bills
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
