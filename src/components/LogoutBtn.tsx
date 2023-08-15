'use client'
import { signOut } from 'next-auth/react'
import React from 'react'
import { IoIosLogOut } from 'react-icons/io'

export default function LogoutBtn() {
    return (
        <div
            onClick={async () => await signOut()}
            className='flex items-center gap-2 cursor-pointer'
        >
            <IoIosLogOut className='text-xl' />
            Logout
        </div>
    )
}
