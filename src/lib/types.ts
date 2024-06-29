export type Account = {
	id: string
	userId: string
	plaidId: string
	name: string
	type: AccountType
	balance: number
	createdAt: Date
	updatedAt: Date | null
}

type AccountType = 'checking' | 'savings' | 'credit' | 'investment' | 'loan'

export type Transaction = {
	id: string
	userId: string
	plaidId: string
	name: string
	type: TransactionType
	amount: number
	createdAt: Date
	updatedAt: Date | null
}

export type TransactionType = 'income' | 'expense'
