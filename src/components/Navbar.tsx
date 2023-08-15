import { getServerAuthSession } from '@/server/auth'
import { prisma } from '@/server/db'
import Image from 'next/image'
import { IoMdArrowDropdown } from 'react-icons/io'
import ProfileDropDown from './ProfileDropDown'

export default async function Navbar() {
    const session = await getServerAuthSession()

    if (session) {
        return (
            <nav className='flex items-center py-3 justify-end px-20'>
                <ProfileDropDown>
                    <div className='flex items-center gap-2'>
                        <Image
                            src={
                                session.user.image ??
                                'https://picsum.photos/32/32'
                            }
                            alt={session.user.email}
                            width={32}
                            height={32}
                            className='rounded-lg'
                        />
                        <p>{session.user.name ?? session.user.email}</p>
                        <IoMdArrowDropdown />
                    </div>
                </ProfileDropDown>
            </nav>
        )
    }

    return null
}
