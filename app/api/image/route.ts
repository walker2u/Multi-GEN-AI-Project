import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';



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

    } catch (error) {
        console.log(error);
        return NextResponse.json({ error }, { status: 500 });
    }
}