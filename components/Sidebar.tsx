"use client";
import Link from 'next/link'
import Image from 'next/image'
import { Montserrat } from 'next/font/google'
import { Code, ImageIcon, LayoutDashboard, MessageSquare, Music, Settings, VideoIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';

const montserrat = Montserrat({ weight: "600", subsets: ["latin"] });

const routes = [
    {
        label: 'Dashboard',
        icon: LayoutDashboard,
        href: '/dashboard',
        color: 'text-sky-500'
    },
    {
        label: 'Coversation',
        icon: MessageSquare,
        href: '/coversation',
        color: 'text-violet-500'
    },
    {
        label: 'Image Generation',
        icon: ImageIcon,
        href: '/image',
        color: 'text-pink-700'
    },
    {
        label: 'Video Generation',
        icon: VideoIcon,
        href: '/video',
        color: 'text-orange-500'
    },
    {
        label: 'Music Generation',
        icon: Music,
        href: '/music',
        color: 'text-emerald-500'
    },
    {
        label: 'Code Generation',
        icon: Code,
        href: '/code',
        color: 'text-green-500'
    },
    {
        label: 'Settings',
        icon: Settings,
        href: '/settings'
    },
]

const Sidebar = () => {
    const pathname = usePathname();
    return (
        <div className="space-y-4 py-4 flex flex-col h-full bg-[#111827] text-white">
            <div className="px-3 py-2 flex-1">
                <Link href={'/dashboard'} className="flex items-center pl-3 mb-14">
                    <div className='relative w-8 h-8'>
                        <Image
                            fill
                            alt="logo"
                            src={'/logo.png'} />
                    </div>
                    <h1 className={cn('text-2xl font-bold', montserrat.className)}>Mayank's GenAi</h1>
                </Link>
                <div className='space-y-1'>
                    {
                        routes.map((route, index) => (
                            <Link href={route.href} key={index} className={cn('text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition',
                                pathname === route.href ? 'text-white bg-white/10' : 'text-zinc-400')}>
                                <div className='flex items-center flex-1'>
                                    <route.icon className={cn('w-5 h-5 mr-3', route.color)} />
                                    {route.label}
                                </div>
                            </Link>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default Sidebar