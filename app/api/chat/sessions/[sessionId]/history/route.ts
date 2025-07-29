/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";

const API_URL = process.env.BACKEND_API_URL || "youAPI_URL";

export async function GET (req: NextRequest, {params}: { params: Promise<{ sessionId: string }>} ) {
    try {
        const { sessionId } = await params;
        console.log(`Getting Chat history for session ${sessionId}`);
        
        const res = await fetch(`${API_URL}/chat/sessions/${sessionId}/history`,
            {
                method: "GET",
                headers: {
                "Content-Type": "application/json",
                },
            });

         if (!res.ok) {
            const error = await res.json();
            console.error("Failed to get chat history:", error);
            return NextResponse.json(
                { error: error.error || "Failed to get chat history" },
                { status: res.status });
        }

        const data = await res.json();
        console.log("Chat history retrieved successfully:", data);

        // Format the response to match the frontend's expected format
        const formattedMessages = data.map((msg: any) => ({
        role: msg.role,
        content: msg.content,
        timestamp: msg.timestamp,
        }));

        return NextResponse.json(formattedMessages);
      } catch (error) {
            console.error("Error to fetch chat history API:", error);
            return NextResponse.json(
                {error: "Failed to fetch chat history"},
                {status: 500}
            );
    }
}