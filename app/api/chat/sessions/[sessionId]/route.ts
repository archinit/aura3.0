import { NextRequest, NextResponse } from "next/server";

const API_URL = process.env.BACKEND_API_URL || "youAPI_URL";

export async function GET (req: NextRequest, {params}: { params: {sessionId: string}} ) {
    try {
        const { sessionId } = params;
        const res = await fetch(`${API_URL}/api/chat/sessions/${sessionId}/history`);

        if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
        }

        const data = await res.json();
        return NextResponse.json(data);
    } catch (error) {
        console.error("Error to fetch chat history API:", error);
        return NextResponse.json(
            {error: "Failed to fetch chat history"},
            {status: 500}
        );
    }
}

export async function POST (req: NextRequest, {params}: {params: {sessionId: string}}) {
    try {
        const { sessionId } = params;
        const {message} = await req.json();

        if (!message) {
            return NextResponse.json(
                {error: "Message is required"},
                { status: 400}
            );
        }

        const res = await fetch(`${API_URL}/api/chat/sessions/${sessionId}/messages`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ message}),
        });

         if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
        }

        const data = await res.json();
        return NextResponse.json(data);

    } catch (error) {
        console.error("Error in chat API:", error);
        return NextResponse.json(
            { error: "Failed to process chat message" },
            { status: 500 }
        );
    }
}