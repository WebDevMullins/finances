import Link from 'next/link'

import { siteConfig } from '@/config/site'
import { cn } from '@/lib/utils'

import { Announcement } from '@/components/announcement'
import { Icons } from '@/components/icons'
import {
	PageActions,
	PageHeader,
	PageHeaderDescription,
	PageHeaderHeading
} from '@/components/page-header'
import { buttonVariants } from '@/components/ui/button'

export default function HomePage() {
	return (
		<div className='container relative'>
			<PageHeader>
				<Announcement />
				<PageHeaderHeading className='max-w-2xl text-pretty bg-[#24caac] bg-clip-text text-transparent'>
					Personal finance management made simple
				</PageHeaderHeading>
				<PageHeaderDescription>
					With Finance App, you can easily track your expenses, create budgets,
					and monitor your progress towards your financial goals.
				</PageHeaderDescription>
				<PageActions>
					<Link
						href='/docs'
						className={cn(buttonVariants())}>
						Get Started
					</Link>
					<Link
						target='_blank'
						rel='noreferrer'
						href={siteConfig.links.github}
						className={cn(buttonVariants({ variant: 'outline' }))}>
						<Icons.gitHub className='mr-2 h-4 w-4' />
						GitHub
					</Link>
				</PageActions>
			</PageHeader>
		</div>
	)
}
