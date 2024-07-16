import { zodResolver } from '@hookform/resolvers/zod'
import { Trash2Icon } from 'lucide-react'
import { useEffect, useState } from 'react'
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

import type { Account, Category } from '@/lib/types'

import { AmountInput } from '@/components/amount-input'
import { DatePicker } from '@/components/date-picker'
import { convertToMiliunits } from '@/lib/utils'
import { getAccountsAction } from '../accounts/actions'
import { getCategoriesAction } from '../categories/actions'
import { createTransactionAction } from './actions'
import { useNewTransaction } from './hooks/use-new-bill'

type Props = {
	id?: string
	defaultValues?: Transaction
	onSubmit?: SubmitHandler<Transaction>
	onDelete?: () => void
}

const formSchema = z.object({
	date: z.coerce.date(),
	amount: z.string(),
	payee: z.string(),
	accountId: z.string(),
	categoryId: z.string()
})

type Transaction = z.input<typeof formSchema>

export function NewTransactionSheet({ id, defaultValues }: Props) {
	const { isOpen, onClose } = useNewTransaction()

	const { isPending, execute, error } = useServerAction(createTransactionAction)

	const form = useForm<Transaction>({
		resolver: zodResolver(formSchema),
		defaultValues: defaultValues
	})

	const [categories, setCategories] = useState<Category[]>([])
	const [accounts, setAccounts] = useState<Account[]>([])

	useEffect(() => {
		async function fetchData() {
			try {
				const [accountData] = await getAccountsAction()
				setAccounts(accountData?.account as Account[])
			} catch (error) {
				console.error('Error fetching accounts', error)
				toast.error('Error fetching accounts')
			}
			try {
				const [categoryData] = await getCategoriesAction()
				setCategories(categoryData?.category as Category[])
			} catch (error) {
				console.error('Error fetching categories', error)
				toast.error('Error fetching categories')
			}
		}
		fetchData().catch(console.error)
	}, [])

	async function onSubmit(values: z.infer<typeof formSchema>) {
		const amount = parseFloat(values.amount)
		const amountInMiliunits = convertToMiliunits(amount)

		await execute({
			...values,
			amount: amountInMiliunits
		})

		if (error) {
			console.error('Error creating transaction', error)
			toast.error('Error creating transaction')
			return
		}

		onClose()
		toast.success('Transaction created')
		form.reset(defaultValues)
	}

	const handleDelete = () => {
		console.log('delete')
	}

	return (
		<Sheet
			open={isOpen}
			onOpenChange={onClose}>
			<SheetContent className='space-y-4'>
				<SheetHeader>
					<SheetTitle>New Transaction</SheetTitle>
					<SheetDescription>Create a new transaction</SheetDescription>
					{error && <div>{error.message}</div>}
				</SheetHeader>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className='space-y-4 pt-4'>
						<FormField
							control={form.control}
							name='date'
							render={({ field }) => (
								<FormItem className='flex flex-col'>
									<FormLabel>Date</FormLabel>
									<DatePicker
										value={field.value}
										onChange={field.onChange}
										disabled={isPending}
									/>
									{/* <FormDescription>
										Your date of birth is used to calculate your age.
									</FormDescription> */}
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							name='amount'
							control={form.control}
							render={({ field }) => (
								<FormItem>
									<FormLabel>Amount</FormLabel>
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
						<FormField
							name='payee'
							control={form.control}
							render={({ field }) => (
								<FormItem>
									<FormLabel>Payee</FormLabel>
									<FormControl>
										<Input
											disabled={isPending}
											placeholder='e.g. Kroger, QT, Target...'
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							name='accountId'
							control={form.control}
							render={({ field }) => (
								<FormItem>
									<FormLabel>Account</FormLabel>
									<Select
										onValueChange={field.onChange}
										defaultValue={field.value}>
										<FormControl>
											<SelectTrigger>
												<SelectValue placeholder='Select an account' />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											{accounts.map((account) => (
												<SelectItem
													key={account.id}
													value={account.id}
													className='capitalize'>
													{account.name}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							name='categoryId'
							control={form.control}
							render={({ field }) => (
								<FormItem>
									<FormLabel>Category</FormLabel>
									<Select
										onValueChange={field.onChange}
										defaultValue={field.value}>
										<FormControl>
											<SelectTrigger>
												<SelectValue placeholder='Select a category' />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											{categories.map((category) => (
												<SelectItem
													key={category.id}
													value={category.id}
													className='capitalize'>
													{category.name}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
									<FormMessage />
								</FormItem>
							)}
						/>

						<Button
							className='w-full'
							disabled={isPending}>
							{id ? 'Save Changes' : 'Create Transaction'}
						</Button>
						{!!id && (
							<Button
								type='button'
								onClick={handleDelete}
								variant={'destructive'}
								className='w-full'
								disabled={isPending}>
								<Trash2Icon className='mr-2 size-4' />
								Delete Transaction
							</Button>
						)}
					</form>
				</Form>
			</SheetContent>
		</Sheet>
	)
}
