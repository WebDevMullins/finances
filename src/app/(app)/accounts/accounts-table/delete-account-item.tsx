import { toast } from 'sonner'
import { useServerAction } from 'zsa-react'

import { DropdownMenuItem } from '@/components/ui/dropdown-menu'

import { Trash2Icon } from 'lucide-react'
import { deleteAccountAction } from '../actions'

type Props = {
	accountId: string
}

export function DeleteAccountItem({ accountId }: Props) {
	const { execute, error } = useServerAction(deleteAccountAction)

	async function deleteAccount() {
		await execute(accountId)

		if (error) {
			console.error('Error creating account', error)
			toast.error('Error creating account')
			return
		}

		toast.success('Account deleted')
	}

	return (
		<DropdownMenuItem
			onClick={() => deleteAccount()}
			className='text-red-500'>
			<Trash2Icon className='mr-2 size-4' />
			<span>Delete Account</span>
		</DropdownMenuItem>
	)
}
