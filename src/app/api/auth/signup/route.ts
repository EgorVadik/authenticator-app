import { prisma } from '@/server/db'
import { hash } from 'bcrypt'
import { NextResponse, NextRequest } from 'next/server'

export async function POST(req: Request) {
    const { email, password } = (await req.json()) as {
        email: string
        password: string
    }

    try {
        const newUser = await prisma.user.create({
            data: {
                email,
                password: await hash(password, 10),
            },
        })

        return NextResponse.json({ newUser }, { status: 201 })
    } catch (error: any) {
        if (error.message.includes('Unique constraint')) {
            return NextResponse.json(
                { error: 'Email already exists' },
                { status: 400 }
            )
        }
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}
