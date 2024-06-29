import { auth } from '@clerk/nextjs/server'
import { createServerActionProcedure } from 'zsa'

export const authenticatedAction = createServerActionProcedure().handler(
	async () => {
		const user = auth()
		return { userId: user.userId }
	}
)
