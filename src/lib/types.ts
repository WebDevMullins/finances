export type Account = {
	id: string
	userId: string
	plaidId: string
	name: string
	type: AccountType
	balance: number
}

type AccountType = 'checking' | 'savings' | 'credit' | 'investment' | 'loan'

export type Transaction = {
	id: string
	date: Date
	payee: string
	amount: number
	accountId: string
	categoryId: string
}

export type TransactionType = 'income' | 'expense'

export type Category = {
	id: string
	userId: string
	name: string
}
