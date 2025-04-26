
import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/connectDb';
import { Application } from '@/models/Application';
import { isValidObjectId } from 'mongoose';

export async function DELETE(req: NextRequest, context: any) {
  const { id: applicationId } = context.params;

  try {
    await connectToDatabase();

    if (!isValidObjectId(applicationId)) {
      return NextResponse.json({ error: 'Invalid application ID' }, { status: 400 });
    }

    const application = await Application.findByIdAndDelete(applicationId);
    if (!application) {
      return NextResponse.json({ error: 'Application not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Application deleted' });
  } catch (error: unknown) {
    console.error('Error deleting application:', error);
    const message = error instanceof Error ? error.message : 'Failed to delete application';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
