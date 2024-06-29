import { deleteAccount, getAccounts } from '@/data-access/accounts'

export async function getAccountsUseCase(userId: string) {
	const accounts = await getAccounts(userId)

	return accounts
}

export async function deleteAccountUseCase(id: string) {
	await deleteAccount(id)
}
