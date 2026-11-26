
import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    throw new Error("Please define MONGODB_URI in your environment variables.");
}

let cached = globalThis.mongoose;

if (!cached) {
    cached = globalThis.mongoose = {
        conn: null,
        promise: null,
    };
}

async function connectToDatabase() {
    if (cached.conn) {
        return cached.conn;
    }

    if (!cached.promise) {
        cached.promise = mongoose.connect(MONGODB_URI, {
            serverSelectionTimeoutMS: 10000,
        });
    }

    try {
        cached.conn = await cached.promise;
        return cached.conn;
    } catch (error) {
        cached.promise = null;
        cached.conn = null;

        console.error("MONGODB CONNECTION ERROR:", error.message);

        throw error;
    }
}

export default connectToDatabase;
