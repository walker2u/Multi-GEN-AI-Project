"use client"

import React, { useEffect, useState } from 'react'
import { Card, CardContent } from './ui/card';
import { MAX_FREE_COUNTS } from '@/constants';
import { Progress } from './ui/progress';
import { Button } from './ui/button';
import { Zap } from 'lucide-react';
import { useProModel } from '@/hooks/use-pro-modal';

interface FreeCounterProps {
    apiLimitCount: number,
    isPro: boolean
}

const FreeCounter = ({ apiLimitCount = 0, isPro }: FreeCounterProps) => {
    const [mounted, setMounted] = useState(false);
    const proModel = useProModel();

    useEffect(() => {
        setMounted(true);
    }, []);
    if (!mounted) {
        return null;
    }
    if (isPro) return null;
    return (
        <div className='px-3'>
            <Card className='bg-white/10 border-0'>
                <CardContent className='py-6'>
                    <div className='text-center text-sm text-white mb-4 space-y-2'>
                        <p className=''>
                            {apiLimitCount} / {MAX_FREE_COUNTS} free generations left
                        </p>
                        <Progress className='h-3' value={(apiLimitCount / MAX_FREE_COUNTS) * 100} />
                    </div>
                    <div>
                        <Button className='w-full' variant={'premium'} onClick={() => proModel.onOpen()}>
                            Upgrade <Zap className='w-4 h-4 ml-2 fill-white' />
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default FreeCounter