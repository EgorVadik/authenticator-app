import { UserEdit } from '@/validations/validations'
import React from 'react'
import { UseFormRegister } from 'react-hook-form'

type InputProps = {
    register: UseFormRegister<UserEdit>
    label: 'email' | 'password' | 'name' | 'bio' | 'phone' | 'photoUrl'
    type: string
    placeholder: string
    name: string
    value?: string
}

export default function EditInput({
    register,
    label,
    type,
    placeholder,
    value,
    name,
}: InputProps) {
    return (
        <div className='space-y-2'>
            <label htmlFor={label}>{name}</label>
            {label === 'bio' ? (
                <textarea
                    id={label}
                    {...register(label)}
                    defaultValue={value}
                    placeholder={placeholder}
                    className='border border-lighter-gray rounded-lg w-full p-4'
                />
            ) : (
                <input
                    id={label}
                    {...register(label)}
                    type={type}
                    defaultValue={value}
                    placeholder={placeholder}
                    className='border border-lighter-gray rounded-lg w-full p-4'
                />
            )}
        </div>
    )
}
