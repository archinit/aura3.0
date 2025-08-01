import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const body = await req.json();
    const API_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL || "yourAPI_URL";

    try {
        const res = await fetch(`${API_URL}/api/user/login`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body),
        });
        const data = await res.json();
        return NextResponse.json(data, { status: res.status});
    } catch (error) {
        return NextResponse.json(
            { msg: "Server error", error },
            { status: 500 }
        );
    };
};