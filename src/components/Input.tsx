import { User } from '@/validations/validations'
import React from 'react'
import { UseFormRegister } from 'react-hook-form'
import { MdEmail, MdLock } from 'react-icons/md'

type InputProps = {
    register: UseFormRegister<User>
    label: 'email' | 'password'
    type: string
    placeholder: string
}

export default function Input({
    register,
    label,
    type,
    placeholder,
}: InputProps) {
    return (
        <div className='inline-block relative w-full'>
            {label === 'email' ? (
                <MdEmail className='absolute top-1/4 left-3 text-lighter-gray' />
            ) : (
                <MdLock className='absolute top-1/4 left-3 text-lighter-gray' />
            )}

            <input
                {...register(label)}
                type={type}
                placeholder={placeholder}
                className='border border-lighter-gray rounded-lg w-full p-2 pl-10 mb-3'
            />
        </div>
    )
}
