import { NextResponse } from "next/server";
import CustomContent from "@/models/CustomContent";
import connectDB from "@/lib/connectDb";

export async function DELETE(request: Request, context: any) {
  const { id } = context.params; // Extract id from context.params

  try {
    await connectDB();
    const content = await CustomContent.findByIdAndDelete(id); // Use id instead of params.id
    if (!content) {
      return NextResponse.json({ error: "CustomContent not found" }, { status: 404 });
    }
    return NextResponse.json({ message: "CustomContent deleted successfully" });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: `Failed to delete CustomContent: ${message}` }, { status: 500 });
  }
}