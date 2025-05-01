import { NextRequest, NextResponse } from 'next/server';
import mongoose from 'mongoose';
import connectToDatabase from '@/lib/connectDb';
import Review from '@/models/Reviews';

// DELETE handler to delete a review by ID
export async function DELETE(req: NextRequest, context: any) {
  const { id } = context.params;

  // Validate ID
  if (!id || !mongoose.Types.ObjectId.isValid(id)) {
    return NextResponse.json({ error: 'Invalid review ID' }, { status: 400 });
  }

  try {
    await connectToDatabase();
    const review = await Review.findByIdAndDelete(id).lean();

    if (!review) {
      return NextResponse.json({ error: 'Review not found' }, { status: 404 });
    }

    console.log('Deleted review:', { reviewId: id });
    return NextResponse.json({ message: 'Review deleted successfully' }, { status: 200 });
  } catch (error: any) {
    console.error('Error deleting review:', error);
    return NextResponse.json(
      { error: `Failed to delete review: ${error.message}` },
      { status: 500 }
    );
  }
}