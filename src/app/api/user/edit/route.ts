import { getServerAuthSession } from '@/server/auth'
import { prisma } from '@/server/db'
import { hash } from 'bcrypt'
import { NextResponse, NextRequest } from 'next/server'

export async function PUT(req: Request) {
    const { name, bio, phone, email, password, photoUrl } =
        (await req.json()) as {
            name: string
            bio: string
            phone: string
            email: string
            password: string
            photoUrl: string
        }

    const session = await getServerAuthSession()

    if (!session) {
        return new NextResponse(null, { status: 401 })
    }

    const user = await prisma.user.findUnique({
        where: {
            id: session.user.id,
        },
    })

    if (!user) {
        return new NextResponse(null, { status: 401 })
    }

    await prisma.user.update({
        where: {
            id: session.user.id,
        },
        data: {
            image: photoUrl,
            name,
            bio,
            phone,
            email: email == null || email == '' ? user.email : email,
            password:
                password == null || password == ''
                    ? user.password
                    : await hash(password, 10),
        },
    })

    return new NextResponse(null, { status: 200 })
}
