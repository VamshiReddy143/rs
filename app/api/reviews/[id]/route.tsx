import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/connectDb';
import Review from '@/models/Reviews';

// DELETE /api/reviews/:id
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {



  const { id } = params;

  if (!id || typeof id !== 'string') {
    return NextResponse.json({ error: 'Invalid review ID' }, { status: 400 });
  }

  try {
    await connectToDatabase();
    const review = await Review.findByIdAndDelete(id);

    if (!review) {
      return NextResponse.json({ error: 'Review not found' }, { status: 404 });
    }

    console.log('Deleted review:', { reviewId: id });
    return NextResponse.json({ message: 'Review deleted successfully' }, { status: 200 });
  } catch (error: unknown) {
    console.error('Error deleting review:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: `Failed to delete review: ${message}` }, { status: 500 });
  }
}
