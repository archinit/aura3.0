import { NextRequest, NextResponse } from "next/server";
import { deleteChatSession } from "@/lib/api/chat";

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ sessionId: string }> }
) {
  try {
    const { sessionId } = await params;
    await deleteChatSession(sessionId);
    return NextResponse.json({ message: "Session deleted" });
  } catch (error) {
    console.error("Failed to delete session:", error);
    return NextResponse.json(
      { error: "Failed to delete session" },
      { status: 500 }
    );
  }
}
