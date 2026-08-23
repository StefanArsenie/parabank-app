import {z} from 'zod'

export const AccountSchema = z.object ({
    id: z.number(),
    customerId: z.number(),
    type: z.string(),
    balance: z.number(),
})

export const AccountsSchema = z.array(AccountSchema);
export type Account = z.infer<typeof AccountSchema>;