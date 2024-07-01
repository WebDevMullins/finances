import { auth } from '@clerk/nextjs/server'

import { DataTable } from '@/components/data-table/data-table'
import { columns } from './categories-table/columns'

import { type Category } from '@/lib/types'
import { getCategoriesAction } from './actions'
import CreateCategoryButton from './create-category-button'

export default async function CategoriesPage() {
	const userId = auth().userId

	const [data] = await getCategoriesAction(userId!)

	return (
		<div className='container py-12'>
			<div className='overflow-hidden rounded-[0.5rem] border bg-background shadow'>
				<div className='hidden h-full flex-1 flex-col space-y-8 p-8 md:flex'>
					<div className='flex items-center justify-between space-y-2'>
						<div>
							<h2 className='text-2xl font-bold tracking-tight'>Categories</h2>
							<p className='text-muted-foreground'>
								Here&apos;s a list of your transactions
							</p>
						</div>
						<div className='flex items-center space-x-2'>
							<CreateCategoryButton />
						</div>
					</div>
					<DataTable
						columns={columns}
						data={data?.category as unknown as Category[]}
						filterKey='name'
					/>
				</div>
			</div>
		</div>
	)
}
