import Image from 'next/image'
import React from 'react'

export function Loader() {
    return (
        <div className='h-full flex flex-col gap-y-0 items-center justify-center'>
            <div className='w-10 h-10 relative animate-pulse'>
                <Image alt='logo' fill src='/logo.png' />
            </div>
            <p className='text-sm text-muted-foreground'>Thinking...</p>
        </div>
    )
}