import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function GET(req: NextRequest) {
    try {
        const sessionToken = req.headers.get("Authorization")?.split(" ")[1];

        if (!sessionToken) {
            return NextResponse.json(
                { isAuthenticated: false, user: null },
                { status: 401 }
            );
        }

        const decoded = jwt.verify
    } catch (error) {
        NextResponse.json(
            {msg: "Internal Server Error"}, 
            {status: 500}
        );
    }
}