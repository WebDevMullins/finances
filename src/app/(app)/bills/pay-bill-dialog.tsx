import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger
} from '@/components/ui/dialog'
import { DropdownMenu, DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { DollarSignIcon } from 'lucide-react'

type Props = {
	children: React.ReactNode
	title: string
	description?: string
}

export function PayBillDialog({ children, title, description }: Props) {
	return (
		<Dialog>
			<DialogTrigger>
				<DropdownMenu>
					<DropdownMenuItem
						onSelect={(e) => {
							e.preventDefault()
						}}
						className='text-emerald-500'>
						<DollarSignIcon className='mr-2 size-4' />
						<span>Pay bill</span>
					</DropdownMenuItem>
				</DropdownMenu>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>{title}</DialogTitle>
					{description && <DialogDescription>{description}</DialogDescription>}
				</DialogHeader>
				{children}
				{/* <DialogFooter>
					<Button type='submit'>Confirm</Button>
				</DialogFooter> */}
			</DialogContent>
		</Dialog>
	)
}
