import { User } from 'next-auth'
import { getToken } from 'next-auth/jwt'
import { NextRequest, NextResponse } from 'next/server'

export async function middleware(req: NextRequest) {
    const token = await getToken({
        req,
        secret: process.env.NEXTAUTH_SECRET,
    })

    const { pathname } = req.nextUrl
    const user = token?.user as User | undefined

    if (
        (pathname.includes('/sign-in') || pathname.includes('/sign-up')) &&
        user
    ) {
        return NextResponse.redirect(new URL('/', req.url))
    }

    if (pathname === '/' && !user) {
        return NextResponse.redirect(new URL('/sign-in', req.url))
    }

    if (pathname === '/') {
        return NextResponse.redirect(new URL('/profile', req.url))
    }

    if ((pathname === '/profile' || pathname === '/edit') && !user) {
        return NextResponse.redirect(new URL('/sign-in', req.url))
    }

    return NextResponse.next()
}

export const config = {
    matcher: [
        '/',
        '/sign-up',
        '/sign-in',
        '/api/auth/:path*',
        '/profile',
        '/edit',
    ],
}
