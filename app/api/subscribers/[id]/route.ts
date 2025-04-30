import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import Subscription from "@/models/Subscription";
import connectToDatabase from "@/lib/connectDb";

export async function DELETE(req: NextRequest, context: any) {
  try {
    await connectToDatabase();

    const { id } = context.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid subscriber ID" }, { status: 400 });
    }

    const deletedSubscriber = await Subscription.findByIdAndDelete(id);

    if (!deletedSubscriber) {
      return NextResponse.json({ error: "Subscriber not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Subscriber deleted successfully" }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}