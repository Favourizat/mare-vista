

import mongoose from "mongoose";

import dns from "dns";

dns.setServers(["8.8.8.8"]);

const MONGODB_URI = process.env.MONGODB_URI

if (!MONGODB_URI) {
    throw new Error("Please define MONGODB_URI in .env.local")
}

let cached = global.mongoose

if (!cached) {
    cached = global.mongoose = {
        conn: null,
        promise: null,
    }
}

async function connectToDatabase() {
    if (cached.conn) {
        return cached.conn
    }

    if (!cached.promise) {
        cached.promise = mongoose.connect(MONGODB_URI)
    }

    cached.conn = await cached.promise

    return cached.conn
}

export default connectToDatabase

        // The entire file is basically saying:"Get my MongoDB URL from the environment variables. 
        // If I don't have one, stop and tell me. Check whether I've already created a MongoDB connection. 
        // If I have, reuse it. If I don't have one but a connection attempt is already happening, 
        // wait for that attempt. Otherwise, start a new connection. 
        // Once the connection is ready, save it and return it. 
        // Finally, make this function available to the rest of the application."