import { z } from 'zod'

export const UserSchema = z.object({
    email: z.string().email(),
    password: z.string(),
})

export type User = z.infer<typeof UserSchema>

export const UserEditSchema = z.object({
    name: z.string().optional(),
    bio: z.string().optional(),
    phone: z.string().optional(),
    email: z.string().email().optional(),
    password: z.string().optional(),
    photoUrl: z.string().optional()
})

export type UserEdit = z.infer<typeof UserEditSchema>
