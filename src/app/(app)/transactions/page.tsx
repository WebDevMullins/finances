import { auth } from '@clerk/nextjs/server'

import { type Transaction } from '@/lib/types'

import CreateTransactionButton from './create-transaction-button'
import { DataTable } from '@/components/data-table/data-table'
import { columns } from './transactions-table/columns'

import { getTransactionsAction } from './actions'

export default async function TransactionsPage() {
	const userId = auth().userId

	const [data] = await getTransactionsAction(userId!)

	return (
		<div className='container py-12'>
			<div className='overflow-hidden rounded-[0.5rem] border bg-background shadow'>
				<div className='hidden h-full flex-1 flex-col space-y-8 p-8 md:flex'>
					<div className='flex items-center justify-between space-y-2'>
						<div>
							<h2 className='text-2xl font-bold tracking-tight'>
								Transactions
							</h2>
							<p className='text-muted-foreground'>
								Here&apos;s a list of your transactions
							</p>
						</div>
						<div className='flex items-center space-x-2'>
							<CreateTransactionButton />
						</div>
					</div>
					<DataTable
						columns={columns}
						data={data?.transaction as unknown as Transaction[]}
						filterKey='name'
					/>
				</div>
			</div>
		</div>
	)
}
