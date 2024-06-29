import { zodResolver } from '@hookform/resolvers/zod'
import { Trash2Icon } from 'lucide-react'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'
import { useServerAction } from 'zsa-react'

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
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from '@/components/ui/select'
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle
} from '@/components/ui/sheet'

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
	type: z.enum(['checking', 'savings', 'credit', 'investment', 'loan']),
	balance: z.coerce.number()
})

type Account = z.input<typeof formSchema>

const accountTypes = ['checking', 'savings', 'credit', 'investment', 'loan']

export function NewAccountSheet({ id, defaultValues }: Props) {
	const { isOpen, onClose } = useNewAccount()

	const { isPending, execute, error } = useServerAction(createAccountAction)

	const form = useForm<Account>({
		resolver: zodResolver(formSchema),
		defaultValues: defaultValues
	})

	async function onSubmit(values: z.infer<typeof formSchema>) {
		await execute(values)

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
							name='type'
							control={form.control}
							render={({ field }) => (
								<FormItem>
									<FormLabel>Type</FormLabel>
									<Select
										onValueChange={field.onChange}
										defaultValue={field.value}>
										<FormControl>
											<SelectTrigger>
												<SelectValue placeholder='Select an account type' />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											{accountTypes.map((type) => (
												<SelectItem
													key={type}
													value={type}
													className='capitalize'>
													{type}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							name='balance'
							control={form.control}
							render={({ field }) => (
								<FormItem>
									<FormLabel>Balance</FormLabel>
									<FormControl>
										<Input
											type='number'
											disabled={isPending}
											placeholder='100.00'
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
