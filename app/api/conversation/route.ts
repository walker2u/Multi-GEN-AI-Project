import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import { GenerativeModel, GoogleGenerativeAI } from '@google/generative-ai'
import { checkSubscription } from '@/lib/subscription';
import { checkApiLimit, increaseApiLimit } from '@/lib/api-limit';

const genAI = new GoogleGenerativeAI(process.env.API_KEY || '');
const model = genAI.getGenerativeModel({
    model: 'gemini-1.5-flash',
});

const chat = model.startChat({
    history: [
        {
            role: "user",
            parts: [{ text: "Hello" }],
        },
        {
            role: "model",
            parts: [{ text: "Great to meet you. What would you like to know?" }],
        },
    ],
});

export async function POST(req: Request) {
    try {
        const { userId } = await auth();
        const body = await req.json();
        const { message } = body;
        console.log(message);
        if (!userId) {
            return NextResponse.json({ error: "Unauthorized User" }, { status: 401 });
        }
        if (!message) {
            return NextResponse.json({ error: "Message is required" }, { status: 400 });
        }
        if (!genAI.apiKey) {
            return NextResponse.json({ error: "Gemini API key is required" }, { status: 400 });
        }

        const freeTrial = await checkApiLimit();
        const isPro = await checkSubscription();
        if (!freeTrial && !isPro) {
            return new NextResponse('Free Trial has expired!', { status: 403 });
        }

        const res = await chat.sendMessage(message);

        if (!isPro) await increaseApiLimit();

        return NextResponse.json(res.response.text());

    } catch (error) {
        return NextResponse.json({ error }, { status: 500 });
    }
}