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
	accountId: string
	categoryId: string
	payee: string
	// type: TransactionType
	amount: number
	date: Date
}

export type TransactionType = 'income' | 'expense'

export type Category = {
	id: string
	userId: string
	name: string
}
