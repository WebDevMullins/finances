import { toast } from 'sonner'
import { useServerAction } from 'zsa-react'

import { ConfirmDeleteDialog } from '@/components/confirm-delete-dialog'
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

	return <ConfirmDeleteDialog onClick={deleteAccount} />
}
