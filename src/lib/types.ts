export type Account = {
	id: string
	userId: string
	plaidId: string
	name: string
	startingBalance: number
}

export type Transaction = {
	id: string
	date: Date
	payee: string
	amount: number
	accountId: string
	categoryId?: string | null
}

export type Category = {
	id: string
	name: string
}
