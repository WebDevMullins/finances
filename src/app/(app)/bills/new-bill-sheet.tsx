import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle
} from '@/components/ui/sheet'

import { NewBillForm } from '@/components/forms/new-bill-form'
import { useNewBill } from './hooks/use-new-bill'

export function NewBillSheet() {
	const { isOpen, onClose } = useNewBill()

	return (
		<Sheet
			open={isOpen}
			onOpenChange={onClose}>
			<SheetContent className='space-y-4'>
				<SheetHeader>
					<SheetTitle>New Bill</SheetTitle>
					<SheetDescription>Create a new bill</SheetDescription>
				</SheetHeader>
				<NewBillForm />
			</SheetContent>
		</Sheet>
	)
}
