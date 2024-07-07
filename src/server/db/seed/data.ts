import { type Account, type Category, type Transaction } from '@/lib/types'
import { faker } from '@faker-js/faker'

const userId = 'user_2hHZ5fBi5FbXa3pwx2Dp5aeYmub'

// Function to generate random accounts data
function generateRandomAccountsData(numAccounts: number) {
	const accountsData: Account[] = []
	for (let i = 1; i <= numAccounts; i++) {
		const account: Account = {
			id: `account_${i}`,
			userId: userId,
			plaidId: faker.string.numeric(10),
			name: faker.finance.accountName(),
			type: faker.helpers.arrayElement([
				'checking',
				'savings',
				'credit',
				'investment',
				'loan'
			]),
			balance: Number(faker.finance.amount()),
			createdAt: faker.date.past(),
			updatedAt: faker.date.recent()
		}
		accountsData.push(account)
	}
	return accountsData
}

// Generate 20 random accounts
export const accountsData = generateRandomAccountsData(20)

function generateRandomTransactionsData(numTransactions: number) {
	const transactionsData: Transaction[] = []
	for (let i = 1; i <= numTransactions; i++) {
		const transaction: Transaction = {
			id: `transaction_${i}`,
			userId: userId,
			accountId: faker.helpers.arrayElement(accountsData).id,
			categoryId: faker.helpers.arrayElement(categoriesData).id,
			plaidId: faker.string.numeric(10),
			name: faker.finance.transactionDescription(),
			type: faker.helpers.arrayElement(['income', 'expense']),
			amount: Number(faker.finance.amount()),
			createdAt: faker.date.past(),
			updatedAt: faker.date.recent()
		}
		transactionsData.push(transaction)
	}
	return transactionsData
}

export const transactionsData = generateRandomTransactionsData(100)

function generateRandomCategoriesData(numCategories: number) {
	const categoriesData: Category[] = []
	for (let i = 1; i <= numCategories; i++) {
		const category: Category = {
			id: `category_${i}`,
			userId: userId,
			name: faker.finance.transactionType(),
			createdAt: faker.date.past(),
			updatedAt: faker.date.recent()
		}
		categoriesData.push(category)
	}
	return categoriesData
}

export const categoriesData = generateRandomCategoriesData(10)
