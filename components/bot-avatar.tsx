import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar'
import React from 'react'

const BotAvatar = () => {
    return (
        <Avatar className='h-12 w-12'>
            <AvatarImage src="/logo.png" className='p-1' />
            <AvatarFallback>AI</AvatarFallback>
        </Avatar>
    )
}

export default BotAvatar