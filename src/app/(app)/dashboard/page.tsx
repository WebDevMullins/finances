import { Chart } from '@/components/chart'
import { currentUser } from '@clerk/nextjs/server'

export default async function DashboardPage() {
	const user = await currentUser()

	return (
		<div className='container py-12'>
			<div className='overflow-hidden rounded-[0.5rem] border bg-background shadow'>
				<div className='hidden h-full flex-1 flex-col space-y-8 p-8 md:flex'>
					<div className='flex items-center justify-between space-y-2'>
						<div>
							<h2 className='text-2xl font-bold tracking-tight'>Dashboard</h2>
							<p className='text-muted-foreground'>
								Welcome back, {user?.firstName}!
							</p>
						</div>
						<div className='flex items-center space-x-2'></div>
					</div>
					<Chart />
				</div>
			</div>
		</div>
	)
}
