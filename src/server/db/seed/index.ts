import { accounts, categories, transactions } from '@/server/db/schema'
import { drizzle, type PostgresJsDatabase } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import { accountsData, categoriesData, transactionsData } from './data'

const queryClient = postgres(
	'postgresql://postgres:hL1rWEawppEulm9S@localhost:5432/finances'
)

const db: PostgresJsDatabase = drizzle(queryClient, { logger: true })

const seed = async () => {
	async function seedAccountsData() {
		try {
			console.log('Seeding accounts data...')
			console.time('DB has been seeded')
			// eslint-disable-next-line drizzle/enforce-delete-with-where
			await db.delete(accounts)
			await db.insert(accounts).values(accountsData)
			// console.log('Accounts data seeded successfully')
		} catch (error) {
			console.error('Error seeding accounts data', error)
		}
	}

	async function seedCategoriesData() {
		try {
			console.log('Seeding categories data...')
			console.time('DB has been seeded')
			// eslint-disable-next-line drizzle/enforce-delete-with-where
			await db.delete(categories)
			await db.insert(categories).values(categoriesData)
			// console.log('Categories data seeded successfully')
		} catch (error) {
			console.error('Error seeding categories data', error)
		}
	}

	async function seedTransactionsData() {
		try {
			console.log('Seeding transactions data...')
			console.time('DB has been seeded')
			// eslint-disable-next-line drizzle/enforce-delete-with-where
			await db.delete(transactions)
			await db.insert(transactions).values(transactionsData)
			// console.log('Transactions data seeded successfully')
		} catch (error) {
			console.error('Error seeding transactions data', error)
		}
	}

	await seedAccountsData()
	await seedCategoriesData()
	await seedTransactionsData()
}

seed()
	.catch((error) => {
		console.error('Error seeding data', error)
		process.exit(1)
	})
	.finally(() => {
		console.log('Seeding completed successfully')
		process.exit(0)
	})
