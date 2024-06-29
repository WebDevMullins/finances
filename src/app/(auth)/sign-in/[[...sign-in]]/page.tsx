import { ClerkLoaded, ClerkLoading, SignIn } from '@clerk/nextjs'
import { Loader2Icon } from 'lucide-react'
import Image from 'next/image'

export default function SignInPage() {
	return (
		<div className='grid min-h-screen grid-cols-1 lg:grid-cols-2'>
			<div className='h-full flex-col items-center justify-center px-4 lg:flex'>
				<div className='space-y-4 pt-16 text-center'>
					<h1 className='text-4xl font-bold'>Finance App</h1>
				</div>
				<div className='mt-8 flex items-center justify-center'>
					<ClerkLoaded>
						<SignIn />
					</ClerkLoaded>
					<ClerkLoading>
						<Loader2Icon className='animate-spin' />
					</ClerkLoading>
				</div>
			</div>
			<div className='hidden h-full items-center justify-center bg-neutral-800 lg:flex'>
				<Image
					src='/logo.svg'
					alt='Logo'
					width={100}
					height={100}
				/>
			</div>
		</div>
	)
}
