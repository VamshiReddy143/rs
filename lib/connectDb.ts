// app/lib/connectDb.ts
import mongoose, { Mongoose } from 'mongoose';

// Define the cached connection interface
interface CachedConnection {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
}

// Extend the global namespace with proper typing
declare global {
  interface GlobalMongoose {
    mongoose?: CachedConnection;
  }
}

// Use unknown and type assertion to safely access global.mongoose
const cached: CachedConnection = (global as unknown as GlobalMongoose).mongoose || {
  conn: null,
  promise: null,
};

// Assign back to global for consistency
(global as unknown as GlobalMongoose).mongoose = cached;

const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
  throw new Error('MONGODB_URI is not defined in .env.local');
}

async function dbConnect(): Promise<Mongoose> {
  // Return cached connection if available
  if (cached.conn) {
    console.log('Reusing existing MongoDB connection');
    return cached.conn;
  }

  // If no connection promise exists, create one
  if (!cached.promise) {
    console.log('Attempting to connect to MongoDB');
    const opts = {
      bufferCommands: false,
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 10000,
      connectTimeoutMS: 10000,
    };

    cached.promise = mongoose
      .connect(MONGODB_URI, opts)
      .then((mongooseInstance) => {
        console.log('MongoDB connected successfully');
        return mongooseInstance;
      })
      .catch((err) => {
        console.error('MongoDB connection error:', err);
        cached.promise = null; // Reset promise on failure to allow retry
        throw new Error(`Failed to connect to MongoDB: ${err.message}`);
      });
  }

  try {
    cached.conn = await cached.promise;
    return cached.conn;
  } catch (error) {
    cached.promise = null; // Reset promise to allow retry
    throw error;
  }
}

// Optional: Add a function to verify connection status
export async function verifyConnection(): Promise<boolean> {
  try {
    await dbConnect();
    return mongoose.connection.readyState === 1; // 1 means connected
  } catch (error) {
    console.error('Connection verification failed:', error);
    return false;
  }
}

export default dbConnect;