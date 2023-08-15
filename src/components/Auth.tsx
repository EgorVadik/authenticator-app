'use client'
import { useForm } from 'react-hook-form'
import Input from './Input'
import { User, UserSchema } from '@/validations/validations'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import axios, { AxiosError } from 'axios'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useToast } from '@/components/ui/use-toast'
import { useState } from 'react'
import AuthProviders from './AuthProviders'

type Props = {
    isLogin?: boolean
}

export default function Auth({ isLogin = false }: Props) {
    const { register, handleSubmit } = useForm<User>({
        resolver: zodResolver(UserSchema),
    })
    const router = useRouter()
    const { toast } = useToast()
    const [loading, setLoading] = useState(false)

    const onSubmit = async (data: User) => {
        setLoading(true)
        if (isLogin) {
            const res = await signIn('credentials', {
                email: data.email,
                password: data.password,
                redirect: false,
            })

            if (res?.error === 'Invalid Email') {
                toast({
                    title: 'Invalid Email',
                    description: 'Please try again',
                })
                setLoading(false)
                return
            }

            if (res?.error === 'Invalid password') {
                toast({
                    title: 'Invalid Password',
                    description: 'Please try again',
                })

                setLoading(false)
                return
            }

            setLoading(false)
            router.refresh()
            return
        }

        try {
            const res = await axios.post('/api/auth/signup', data)
            if (res.status === 201) {
                signIn('credentials', {
                    email: data.email,
                    password: data.password,
                    redirect: true,
                })
                toast({
                    title: 'Account created and logged in successfully. 🎉',
                })
                router.replace('/profile')
                router.refresh()
            }
        } catch (error) {
            if (error instanceof AxiosError) {
                switch (error.response?.status) {
                    case 400:
                        toast({
                            title: 'Email already exists',
                            description: 'Please try another email',
                        })
                        break

                    default:
                        toast({
                            title: 'Something went wrong',
                            description: 'Please try again later',
                        })
                        break
                }
            }
        } finally {
            setLoading(false)
        }
    }

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className='border border-lighter-gray rounded-3xl md:p-16 p-5 max-w-md text-dark-gray space-y-5'
        >
            <div className='space-y-2'>
                <p className='text-lg font-bold tracking-[-0.63px]'>
                    {!isLogin
                        ? 'Join thousands of learners from around the world'
                        : 'Login'}
                </p>
                {!isLogin && (
                    <p className='tracking-[-0.56px]'>
                        Master web development by making real-life projects.
                        There are multiple paths for you to choose
                    </p>
                )}
            </div>
            <div className='space-y-3'>
                <Input
                    label='email'
                    placeholder='Email'
                    register={register}
                    type='email'
                />

                <Input
                    label='password'
                    placeholder='Password'
                    register={register}
                    type='password'
                />
            </div>
            <button
                className='w-full bg-dark-blue rounded-lg text-white font-bold py-2'
                disabled={loading}
            >
                {loading
                    ? 'Loading...'
                    : !isLogin
                    ? 'Start coding now'
                    : 'Login'}
            </button>
            <p className='text-center text-sm text-light-gray'>
                or continue with these social profiles
            </p>
            <div className='flex items-center justify-center gap-4'>
                <AuthProviders provider='Google' />
                <AuthProviders provider='Facebook' />
                <AuthProviders provider='Twitter' />
                <AuthProviders provider='Gihub' />
            </div>

            <div className='flex gap-1 items-center justify-center text-sm tracking-[-0.49px] text-light-gray'>
                {!isLogin ? 'Already a member?' : "Don't have an account yet?"}
                <Link
                    href={!isLogin ? 'sign-in' : '/sign-up'}
                    className='text-light-blue'
                >
                    {!isLogin ? 'Login' : 'Register'}
                </Link>
            </div>
        </form>
    )
}
