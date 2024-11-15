import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import LandingNavbar from '@/components/landing-navbar'

const LandingPage = () => {
    return (
        <div className='h-full'>
            <LandingNavbar />
            <div className='h-[80vh] flex items-center justify-center flex-col gap-y-4'>
                <h1 className='text-4xl sm:text-6xl lg:text-7xl font-bold text-center text-primary'>Welcome to Mayank's GenAI</h1>
                <p className='text-sm text-muted-foreground sm:text-xl text-center'>Chat with the smartest AI - Experience the power of AI</p>
                <div className='flex items-center gap-x-2 justify-center'>
                    <Link href='/dashboard'>
                        <Button size='lg'>Start Now</Button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default LandingPage