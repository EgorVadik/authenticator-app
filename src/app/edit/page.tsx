import EditProfile from '@/components/EditProfile'
import { getServerAuthSession } from '@/server/auth'
import { prisma } from '@/server/db'
import { redirect } from 'next/navigation'

export const dynamic = 'force-dynamic'

export default async function page() {
    const session = await getServerAuthSession()
    if (!session) redirect('/login')

    const user = await prisma.user.findUnique({
        where: {
            id: session.user.id,
        },
        select: {
            bio: true,
            email: true,
            id: true,
            image: true,
            name: true,
            phone: true,
        },
    })
    if (!user) redirect('/login')

    return (
        <main className='min-h-screen flex flex-col items-center justify-center p-5 max-w-3xl m-auto'>
            <EditProfile user={user} />
        </main>
    )
}
