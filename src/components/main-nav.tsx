'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import Logo from '@/components/logo'

import { cn } from '@/lib/utils'

const links = [
	{ label: 'Dashboard', href: '/dashboard' },
	{ label: 'Transactions', href: '/transactions' },
	{ label: 'Accounts', href: '/accounts' },
	{ label: 'Categories', href: '/categories' },
	{ label: 'Settings', href: '/settings' }
]

export function MainNav() {
	const pathname = usePathname()

	return (
		<div className='hidden md:flex'>
			<Logo />
			<nav className='ml-8 flex items-center gap-x-4 text-sm lg:gap-x-6'>
				{links.map((item) => (
					<Link
						key={item.label}
						href={item.href}
						className={cn(
							'transition-colors hover:text-foreground/80',
							pathname === `${item.href}`
								? 'text-foreground'
								: 'text-foreground/70'
						)}>
						{item.label}
					</Link>
				))}
			</nav>
		</div>
	)
}
