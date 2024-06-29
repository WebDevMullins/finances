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
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle
} from '@/components/ui/sheet'

import { createCategoryAction } from './actions'
import { useNewCategory } from './hooks/use-new-category'

type Props = {
	id?: string
	defaultValues?: Category
	onSubmit?: SubmitHandler<Category>
	onDelete?: () => void
}

const formSchema = z.object({
	name: z.string().min(1)
})

type Category = z.input<typeof formSchema>

export function NewCategorySheet({ id, defaultValues }: Props) {
	const { isOpen, onClose } = useNewCategory()

	const { isPending, execute, error } = useServerAction(createCategoryAction)

	const form = useForm<Category>({
		resolver: zodResolver(formSchema),
		defaultValues: defaultValues
	})

	async function onSubmit(values: z.infer<typeof formSchema>) {
		await execute(values)

		if (error) {
			console.error('Error creating category', error)
			toast.error('Error creating category')
			return
		}

		onClose()
		toast.success('Category created')
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
					<SheetTitle>New Category</SheetTitle>
					<SheetDescription>Create a new category</SheetDescription>
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
						<Button
							className='w-full'
							disabled={isPending}>
							{id ? 'Save Changes' : 'Create Category'}
						</Button>
						{!!id && (
							<Button
								type='button'
								onClick={handleDelete}
								variant={'destructive'}
								className='w-full'
								disabled={isPending}>
								<Trash2Icon className='mr-2 size-4' />
								Delete Category
							</Button>
						)}
					</form>
				</Form>
			</SheetContent>
		</Sheet>
	)
}
