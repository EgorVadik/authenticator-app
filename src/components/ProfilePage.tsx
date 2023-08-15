import { User } from '@prisma/client'
import ProfileInfoItem from './ProfileInfoItem'
import Link from 'next/link'

type ProfilePageProps = {
    user: Omit<User, 'password'>
}

export default function ProfilePage({ user }: ProfilePageProps) {
    return (
        <div className='w-full space-y-10'>
            <div className='text-center space-y-2'>
                <h1 className='text-4xl tracking-[-1.26px]'>Personal info</h1>
                <p className='text-lg font-light tracking-[-0.63px]'>
                    Basic info, like your name and photo
                </p>
            </div>
            <div className='border border-lightest-gray rounded-xl'>
                <div className='flex items-center justify-between border-b border-b-lightest-gray px-10 py-5'>
                    <div>
                        <h2 className='text-2xl tracking-[-0.84px]'>Profile</h2>
                        <p className='text-[13px] text-light-gray'>
                            Some info may be visible to other people
                        </p>
                    </div>
                    <Link
                        href={'/edit'}
                        className='border border-light-gray rounded-xl px-5 py-1 text-light-gray font-medium'
                    >
                        Edit
                    </Link>
                </div>
                <div>
                    <ProfileInfoItem
                        title='photo'
                        data={user.email}
                        image={user.image ?? 'https://picsum.photos/200/300'}
                        borderBottom
                    />
                    <ProfileInfoItem
                        title='name'
                        data={user.name ?? ''}
                        borderBottom
                    />
                    <ProfileInfoItem
                        title='bio'
                        data={user.bio ?? ''}
                        borderBottom
                    />
                    <ProfileInfoItem
                        title='phone'
                        data={user.phone ?? ''}
                        borderBottom
                    />
                    <ProfileInfoItem
                        title='email'
                        data={user.email}
                        borderBottom
                    />
                    <ProfileInfoItem title='password' data='**********' />
                </div>
            </div>
        </div>
    )
}
