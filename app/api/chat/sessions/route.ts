import { NextRequest, NextResponse } from "next/server";

const API_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL ||  "yourAPI_URL";

export async function GET(req: NextRequest) {
    try {
        const authHeader = req.headers.get("Authorization");

        if (!authHeader) {
            return NextResponse.json({error: "Authorization header is required"}, {status: 401});
        }

        const res = await fetch(`${API_URL}/api/chat/sessions`, {
            method: "GET",
            headers: {
                "Authorization": authHeader,
            },
        });

        if (!res.ok) {
            const error = await res.json();
            console.error("Failed to fetch chat sessions:", error);
            return NextResponse.json(
                {error: error.error || "Failed to fetch chat sessions"},
                {status: res.status}
            );
        }

        const data = await res.json();
        return NextResponse.json(data);
    } catch (error) {
        console.error("Error fetching chat sessions:", error);
        return NextResponse.json(
            { error: "Failed to fetch chat sessions"},
            { status: 500}
        );
    }
}

export async function POST(req: NextRequest) {
    try {
        const authHeader = req.headers.get("Authorization");

        if (!authHeader) {
            return NextResponse.json({error: "Authorization header is required"}, {status: 401});
        }

        const res = await fetch(`${API_URL}/api/chat/sessions`,{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: authHeader,
            },
        });

        if (!res.ok) {
            const error = await res.json();
            console.error("Failed to create chat session", error);
            return NextResponse.json(
                {error: error.error || "Failed to create chat session"},
                {status: res.status}
            );
        }

        const data = await res.json();
        console.log("Chat session created:", data);
        return NextResponse.json(data);


        
    } catch (error) {
        console.error("Error creating chat session:", error);
        return NextResponse.json(
            { error: "Failed to create chat session"},
            { status: 500}
        );
    }
};