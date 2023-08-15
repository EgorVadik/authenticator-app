import { getServerAuthSession } from '@/server/auth'
import ProfilePage from '../../components/ProfilePage'
import { redirect } from 'next/navigation'
import { prisma } from '@/server/db'

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
            <ProfilePage user={user} />
        </main>
    )
}
