// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { sql } from 'drizzle-orm'
import {
	pgTableCreator,
	real,
	text,
	timestamp,
	varchar
} from 'drizzle-orm/pg-core'
import { createInsertSchema } from 'drizzle-zod'

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
	name: varchar('name', { length: 50 }).notNull(),
	type: varchar('type', { length: 50 }).notNull(),
	balance: real('balance').notNull(),
	createdAt: timestamp('created_at', { withTimezone: true })
		.default(sql`CURRENT_TIMESTAMP`)
		.notNull(),
	updatedAt: timestamp('updatedAt', { withTimezone: true })
})

export const AccountSchema = createInsertSchema(accounts)

export const transactions = createTable('transactions', {
	id: text('id').primaryKey(),
	userId: text('user_id').notNull(),
	plaidId: text('plaid_id').notNull(),
	name: varchar('name', { length: 50 }).notNull(),
	type: varchar('type', { length: 50 }).notNull(),
	amount: real('amount').notNull(),
	createdAt: timestamp('created_at', { withTimezone: true })
		.default(sql`CURRENT_TIMESTAMP`)
		.notNull(),
	updatedAt: timestamp('updatedAt', { withTimezone: true })
})

export const TransactionSchema = createInsertSchema(transactions)

export const categories = createTable('categories', {
	id: text('id').primaryKey(),
	userId: text('user_id').notNull(),
	name: varchar('name', { length: 50 }).notNull(),
	createdAt: timestamp('created_at', { withTimezone: true })
		.default(sql`CURRENT_TIMESTAMP`)
		.notNull(),
	updatedAt: timestamp('updatedAt', { withTimezone: true })
})

export const CategorySchema = createInsertSchema(categories)
