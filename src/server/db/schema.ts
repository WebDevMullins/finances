// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { relations } from 'drizzle-orm'
import {
	boolean,
	integer,
	pgTableCreator,
	text,
	timestamp,
	varchar
} from 'drizzle-orm/pg-core'
import { createInsertSchema } from 'drizzle-zod'
import { z } from 'zod'

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `finances_${name}`)

export const accounts = createTable('accounts', {
	id: text('id').primaryKey(),
	userId: text('user_id').notNull(),
	plaidId: text('plaid_id').notNull(),
	name: text('name').notNull(),
	startingBalance: integer('starting_balance').notNull()
})

export const accountsRelations = relations(accounts, ({ many }) => ({
	transactions: many(transactions)
}))

export const AccountSchema = createInsertSchema(accounts)

export const transactions = createTable('transactions', {
	id: text('id').primaryKey(),
	amount: integer('amount').notNull(),
	payee: text('payee').notNull(),
	date: timestamp('date', { mode: 'date' }).notNull(),
	accountId: text('account_id')
		.references(() => accounts.id, {
			onDelete: 'cascade'
		})
		.notNull(),
	categoryId: text('category_id').references(() => categories.id, {
		onDelete: 'set null'
	})
})

export const transactionsRelations = relations(transactions, ({ one }) => ({
	account: one(accounts, {
		fields: [transactions.accountId],
		references: [accounts.id]
	}),
	categories: one(categories, {
		fields: [transactions.categoryId],
		references: [categories.id]
	})
}))

export const TransactionSchema = createInsertSchema(transactions, {
	date: z.coerce.date()
})

export const categories = createTable('categories', {
	id: text('id').primaryKey(),
	name: varchar('name').notNull()
})

export const categoriesRelations = relations(categories, ({ many }) => ({
	transactions: many(transactions)
}))

export const CategorySchema = createInsertSchema(categories)

export const bills = createTable('bills', {
	id: text('id').primaryKey(),
	recurringId: text('recurring_id'),
	amount: integer('amount').notNull(),
	payee: text('payee').notNull(),
	dueDate: timestamp('due_date').notNull(),
	isRecurring: boolean('is_reccuring').notNull(),
	isPaid: boolean('is_paid'),
	categoryId: text('category_id')
		.references(() => categories.id, {
			onDelete: 'set null'
		})
		.notNull(),
	transactionId: text('transaction_id').references(() => transactions.id, {
		onDelete: 'set null'
	})
})

export const billsRelations = relations(bills, ({ one }) => ({
	category: one(categories, {
		fields: [bills.categoryId],
		references: [categories.id]
	}),
	transaction: one(transactions, {
		fields: [bills.transactionId],
		references: [transactions.id]
	})
}))

// Create insert schema for bills
export const BillSchema = createInsertSchema(bills, {
	dueDate: z.coerce.date()
})
