"use client"

import { Heading } from '@/components/heading'
import { Code } from 'lucide-react'
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
import UserAvatar from '@/components/user-avatar'
import BotAvatar from '@/components/bot-avatar'
import ReactMarkdown from 'react-markdown'
import { useProModel } from '@/hooks/use-pro-modal'
import toast from 'react-hot-toast'

type Message = {
    role: string;
    content: string;
};

const CodePage = () => {
    const proModel = useProModel();
    const router = useRouter();
    const [messages, setMessages] = useState<Message[]>([]);
    console.log("Hereeeeee", messages);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            prompt: ''
        }
    });

    const isLoading = form.formState.isSubmitting;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            const userMessage = {
                role: 'user',
                content: values.prompt
            };
            const response = await axios.post('/api/code', {
                message: values.prompt
            });
            const modelMessage = {
                role: 'system',
                content: response.data
            }
            setMessages((prev) => [...prev, userMessage, modelMessage]);
            form.reset();

        } catch (error: any) {
            if (error?.response?.status === 403) {
                proModel.onOpen();
            } else {
                toast.error('Something went wrong');
            }
        } finally {
            router.refresh();
        }
    }

    return (
        <div>
            <Heading
                title='Code Generation'
                description='Generate Code using descriptive text.'
                icon={Code}
                iconColor='text-green-700'
                bgColor='bg-green-700/10'
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
                            <div className='p-8 rounded-lg w-full flex items-center justify-center bg-muted'>
                                <Loader />
                            </div>
                        )
                    }
                    {
                        messages.length === 0 && !isLoading && (
                            <Empty label='No conversation started' />
                        )
                    }
                    <div className='flex flex-col-reverse gap-y-4'>
                        {
                            messages.map((message, idx) => (
                                <div
                                    key={idx}
                                    className={cn('p-8 w-full flex items-start gap-x-8 rounded-lg', message.role === 'user' ? 'bg-white border border-black/10' : 'bg-muted')}>
                                    {message.role === 'user' ? <UserAvatar /> : <BotAvatar />}
                                    <div className='text-sm'>
                                        <ReactMarkdown components={{
                                            pre: ({ node, ...props }) => (
                                                <div className='overflow-auto w-full my-2 bg-black/10 p-2 rounded-lg'>
                                                    <pre {...props} />
                                                </div>
                                            ),
                                            code: ({ node, ...props }) => (
                                                <code className='bg-black/10 rounded-lg p-1' {...props} />
                                            )
                                        }}
                                            className={'text-sm overflow-hidden leading-7'}
                                        >
                                            {message.content?.toString()}
                                        </ReactMarkdown>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default dynamic(() => Promise.resolve(CodePage), { ssr: false });