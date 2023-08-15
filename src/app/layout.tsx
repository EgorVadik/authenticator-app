import './globals.css'
import type { Metadata } from 'next'
import { Toaster } from '@/components/ui/toaster'
import Navbar from '@/components/Navbar'

export const metadata: Metadata = {
    title: 'Authenticator App',
    description:
        'A simple authenticator app built with Next.js, tailwind CSS, next-auth and MongoDB',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang='en'>
            <body>
                <Navbar />
                {children}
                <Toaster />
            </body>
        </html>
    )
}
