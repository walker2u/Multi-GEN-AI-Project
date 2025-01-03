"use client"

import { Heading } from '@/components/heading'
import { ImageIcon } from 'lucide-react'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { formSchema } from './constants'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { Empty } from '@/components/empty'
import { Loader } from '@/components/loader'
import { cn } from '@/lib/utils'

type Message = {
    role: string;
    content: string;
};

const ImagePage = () => {
    const router = useRouter();
    const [images, setImages] = useState<string[]>([]);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            prompt: '',
            amount: "1",
            resolution: "512x512",
        },
    });

    const isLoading = form.formState.isSubmitting;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            setImages([]);
            const response = await fetch('https://api.deepai.org/api/text2img', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'api-key': 'd3692567-b2d4-46e3-8b12-14a4f2940100'
                },
                body: JSON.stringify({
                    text: values.prompt,
                })
            });
            const data = await response.json();
            console.log("data is hereeeee", data);
            form.reset();

        } catch (error: any) {
            //TODO openai Pro Model
            console.log("Hereeeeee", error);
        } finally {
            router.refresh();
        }
    }

    return (
        <div>
            <Heading
                title='Image Generation'
                description='Turn your prompt into an image.'
                icon={ImageIcon}
                iconColor='text-pink-500'
                bgColor='bg-pink-500/10'
            />
            <div className='px-4 lg:px-8'>
                <div>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className='rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2'>
                            <FormField
                                name='prompt'
                                render={({ field }) => (
                                    <FormItem className='col-span-12 lg:col-span-10'>
                                        <FormControl className='m-0 p-0'>
                                            <Input
                                                className='border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent'
                                                disabled={isLoading}
                                                placeholder='Message...'
                                                {...field}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <Button className='col-span-12 lg:col-span-2 w-full' disabled={isLoading}>Generate</Button>
                        </form>
                    </Form>
                </div>
                <div className='space-y-4 mt-4'>
                    {
                        isLoading && (
                            <div className='p-20'>
                                <Loader />
                            </div>
                        )
                    }
                    {
                        images.length === 0 && !isLoading && (
                            <Empty label='No Images Generated' />
                        )
                    }
                    <div>
                        Images here
                    </div>
                </div>
            </div>
        </div>
    )
}

export default dynamic(() => Promise.resolve(ImagePage), { ssr: false });