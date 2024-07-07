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

import type { Account, Category } from '@/lib/types'
import { useEffect, useState } from 'react'
import { getAccountsAction } from '../accounts/actions'
import { getCategoriesAction } from '../categories/actions'
import { createTransactionAction } from './actions'
import { useNewTransaction } from './hooks/use-new-transaction'

type Props = {
	id?: string
	defaultValues?: Transaction
	onSubmit?: SubmitHandler<Transaction>
	onDelete?: () => void
}

const formSchema = z.object({
	accountId: z.string(),
	categoryId: z.string(),
	name: z.string().min(1),
	type: z.enum(['income', 'expense']),
	amount: z.coerce.number()
})

type Transaction = z.input<typeof formSchema>

const transactionTypes = ['income', 'expense']

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
		await execute(values)

		if (error) {
			console.error('Error creating transaction', error)
			toast.error('Error creating transaction')
			return
		}

		onClose()
		toast.success('Transaction created')
		form.reset({ name: '' })
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
							name='name'
							control={form.control}
							render={({ field }) => (
								<FormItem>
									<FormLabel>Name</FormLabel>
									<FormControl>
										<Input
											disabled={isPending}
											placeholder='e.g. Gas, Food, Clothes...'
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
												<SelectValue placeholder='Select an transaction type' />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											{transactionTypes.map((type) => (
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
													value={account.name}
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
													value={category.name}
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
						<FormField
							name='amount'
							control={form.control}
							render={({ field }) => (
								<FormItem>
									<FormLabel>Amount</FormLabel>
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
