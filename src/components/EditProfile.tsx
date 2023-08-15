'use client'

import Image from 'next/image'
import { useState } from 'react'
import EditInput from './EditInput'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { UserEdit, UserEditSchema } from '@/validations/validations'
import Link from 'next/link'
import { FaArrowLeft } from 'react-icons/fa'
import axios, { AxiosError } from 'axios'
import { useToast } from '@/components/ui/use-toast'
import { User } from '@prisma/client'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'

type EditProfileProps = {
    user: Omit<User, 'password'>
}

export default function EditProfile({ user }: EditProfileProps) {
    const { register, handleSubmit } = useForm<UserEdit>({
        resolver: zodResolver(UserEditSchema),
    })
    const { toast } = useToast()
    const router = useRouter()
    const [loading, setLoading] = useState(false)

    const onSubmit = async (data: UserEdit) => {
        setLoading(true)
        try {
            const res = await axios.put('/api/user/edit', data)
            if (res.status === 200) {
                toast({
                    title: 'Success',
                    description: 'Your profile has been updated',
                })
                router.push('/profile')
                router.refresh()
            }
        } catch (error) {
            if (error instanceof AxiosError) {
                if (error.response?.status === 401) {
                    toast({
                        title: 'Error',
                        description: 'You are not authorized',
                    })
                }

                if (error.response?.status === 400) {
                    toast({
                        title: 'Error',
                        description: 'Something went wrong',
                    })
                }
            }
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className='w-full space-y-3'>
            <Link href='..' className='text-light-blue flex items-center gap-2'>
                <FaArrowLeft />
                Back
            </Link>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className='border border-lightest-gray rounded-xl px-10 py-5'
            >
                <div>
                    <h2 className='text-2xl tracking-[-0.84px]'>Change Info</h2>
                    <p className='text-[13px] text-light-gray'>
                        Changes will be reflected to every services
                    </p>
                </div>
                <div className='flex items-center gap-4 my-7'>
                    <div className='relative w-fit'>
                        <Image
                            src={user.image ?? 'https://picsum.photos/72/72'}
                            alt={'pfp'}
                            width={72}
                            height={72}
                            className='w-[72px] h-[72px] rounded-lg'
                        />

                        <div className='absolute inset-0 bg-black/20 rounded-lg'></div>
                    </div>
                </div>
                <div className='space-y-5'>
                    <EditInput
                        label='name'
                        placeholder='Enter your name...'
                        value={user.name ?? ''}
                        register={register}
                        name='Name'
                        type='text'
                    />
                    <EditInput
                        label='photoUrl'
                        placeholder='Enter image URL'
                        value={user.image ?? ''}
                        register={register}
                        name='Image'
                        type='text'
                    />
                    <EditInput
                        label='bio'
                        placeholder='Enter your bio...'
                        value={user.bio ?? ''}
                        register={register}
                        name='Bio'
                        type='text'
                    />
                    <EditInput
                        label='phone'
                        placeholder='Enter your phone...'
                        value={user.phone ?? ''}
                        register={register}
                        name='Phone'
                        type='tel'
                    />
                    <EditInput
                        label='email'
                        placeholder='Enter your email...'
                        value={user.email}
                        register={register}
                        name='Email'
                        type='email'
                    />
                    <EditInput
                        label='password'
                        placeholder='Enter your new password...'
                        // value='password'
                        register={register}
                        name='Password'
                        type='password'
                    />
                </div>
                <button
                    className='bg-dark-blue px-3 py-2 mt-5 text-white rounded-lg'
                    disabled={loading}
                >
                    {loading ? 'Loading...' : 'Save'}
                </button>
            </form>
        </div>
    )
}
