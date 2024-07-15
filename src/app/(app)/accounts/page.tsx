import { type Account } from '@/lib/types'

import { DataTable } from '@/components/data-table/data-table'
import { columns } from './accounts-table/columns'
import CreateAccountButton from './create-account-button'

import { getAccountsAction } from './actions'

export default async function AccountsPage() {
	const [data] = await getAccountsAction()

	return (
		<div className='container py-12'>
			<div className='overflow-hidden rounded-[0.5rem] border bg-background shadow'>
				<div className='hidden h-full flex-1 flex-col space-y-8 p-8 md:flex'>
					<div className='flex items-center justify-between space-y-2'>
						<div>
							<h2 className='text-2xl font-bold tracking-tight'>Accounts</h2>
							<p className='text-muted-foreground'>
								Here&apos;s a list of your accounts
							</p>
						</div>
						<div className='flex items-center space-x-2'>
							<CreateAccountButton />
						</div>
					</div>
					<DataTable
						columns={columns}
						data={data?.account as unknown as Account[]}
						filterKey='name'
					/>
				</div>
			</div>
		</div>
	)
}
