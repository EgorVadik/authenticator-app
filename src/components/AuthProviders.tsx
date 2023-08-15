'use client'
import Image from 'next/image'
import React from 'react'
import { useToast } from '@/components/ui/use-toast'

type Props = {
    provider: string
}

export default function AuthProviders({ provider }: Props) {
    const { toast } = useToast()

    return (
        <button
            type='button'
            onClick={() => {
                toast({
                    title: 'Oops!',
                    description: '2 lazy to implement that',
                })
            }}
        >
            <Image
                src={`${provider}.svg`}
                alt={`${provider} logo`}
                width={40}
                height={40}
            />
        </button>
    )
}
