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

export type Bill = {
	id: string
	recurringId?: string | null
	payee: string
	amount: number
	dueDate: Date
	isRecurring: boolean
	isPaid: boolean
	categoryId: string
	transactionId: string
}
