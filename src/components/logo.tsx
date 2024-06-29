import Image from 'next/image'
import Link from 'next/link'

export default function Logo() {
	return (
		<Link href='/'>
			<div className='hidden items-center lg:flex'>
				<Image
					src='/logo.svg'
					alt='logo'
					height={28}
					width={28}
				/>
				<p className='ml-2.5 bg-gradient-to-r from-[#24caac] to-teal-200 bg-clip-text text-xl font-bold leading-tight tracking-tighter text-transparent'>
					Finance App
				</p>
			</div>
		</Link>
	)
}

export function LogoMobile() {
	return (
		<Link
			href='/'
			className='flex items-center gap-2'>
			<Image
				src='/logo.svg'
				alt='logo'
				height={28}
				width={28}
			/>
			<p className='bg-gradient-to-r from-[#24caac] to-teal-200 bg-clip-text text-xl font-bold leading-tight tracking-tighter text-transparent'>
				Finance App
			</p>
		</Link>
	)
}
