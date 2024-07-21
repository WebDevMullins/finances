import { type Bill } from '@/lib/types'

import { DataTable } from '@/components/data-table/data-table'
import { columns } from './bills-table/columns'
import CreateBillButton from './create-bill-button'

import { getBillsAction } from './actions'

export default async function BillsPage() {
	const [billData] = await getBillsAction()

	return (
		<div className='container py-12'>
			<div className='overflow-hidden rounded-[0.5rem] border bg-background shadow'>
				<div className='hidden h-full flex-1 flex-col space-y-8 p-8 md:flex'>
					<div className='flex items-center justify-between space-y-2'>
						<div>
							<h2 className='text-2xl font-bold tracking-tight'>Bills</h2>
							<p className='text-muted-foreground'>
								Here&apos;s a list of your bills
							</p>
						</div>
						<div className='flex items-center space-x-2'>
							<CreateBillButton />
						</div>
					</div>
					<DataTable
						columns={columns}
						data={billData?.bill as Bill[]}
						filterKey='payee'
						options={['recurring', 'paid']}
					/>
				</div>
			</div>
		</div>
	)
}
