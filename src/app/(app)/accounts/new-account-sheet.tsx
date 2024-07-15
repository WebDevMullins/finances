import { zodResolver } from '@hookform/resolvers/zod'
import { Trash2Icon } from 'lucide-react'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'
import { useServerAction } from 'zsa-react'

import { AmountInput } from '@/components/amount-input'
import { Button } from '@/components/ui/button'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle
} from '@/components/ui/sheet'

import { convertToMiliunits } from '@/lib/utils'
import { createAccountAction } from './actions'
import { useNewAccount } from './hooks/use-new-account'

type Props = {
	id?: string
	defaultValues?: Account
	onSubmit?: SubmitHandler<Account>
	onDelete?: () => void
}

const formSchema = z.object({
	name: z.string().min(1),
	startingBalance: z.string()
})

type Account = z.input<typeof formSchema>

export function NewAccountSheet({ id, defaultValues }: Props) {
	const { isOpen, onClose } = useNewAccount()

	const { isPending, execute, error } = useServerAction(createAccountAction)

	const form = useForm<Account>({
		resolver: zodResolver(formSchema),
		defaultValues: defaultValues
	})

	async function onSubmit(values: z.infer<typeof formSchema>) {
		const startingBalance = parseFloat(values.startingBalance)
		const startingBalanceInMiliunits = convertToMiliunits(startingBalance)

		await execute({
			...values,
			startingBalance: startingBalanceInMiliunits
		})

		if (error) {
			console.error('Error creating account', error)
			toast.error('Error creating account')
			return
		}

		onClose()
		toast.success('Account created')
		form.reset({ name: '' })
	}

	const handleDelete = () => {
		console.log('delete')
		// onDelete?.()
	}

	return (
		<Sheet
			open={isOpen}
			onOpenChange={onClose}>
			<SheetContent className='space-y-4'>
				<SheetHeader>
					<SheetTitle>New Account</SheetTitle>
					<SheetDescription>Create a new account</SheetDescription>
					{error && <div>{error.message}</div>}
				</SheetHeader>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className='space-y-4 pt-4'>
						<FormField
							name='name'
							control={form.control}
							render={({ field }) => (
								<FormItem>
									<FormLabel>Name</FormLabel>
									<FormControl>
										<Input
											disabled={isPending}
											placeholder='e.g. Cash, Bank, Credit Card...'
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							name='startingBalance'
							control={form.control}
							render={({ field }) => (
								<FormItem>
									<FormLabel>Starting Balance</FormLabel>
									<FormControl>
										<AmountInput
											disabled={isPending}
											placeholder='$0.00'
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<Button
							className='w-full'
							disabled={isPending}>
							{id ? 'Save Changes' : 'Create Account'}
						</Button>
						{!!id && (
							<Button
								type='button'
								onClick={handleDelete}
								variant={'destructive'}
								className='w-full'
								disabled={isPending}>
								<Trash2Icon className='mr-2 size-4' />
								Delete Account
							</Button>
						)}
					</form>
				</Form>
			</SheetContent>
		</Sheet>
	)
}
