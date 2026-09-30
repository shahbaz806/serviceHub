import mongoose from 'mongoose';

export async function connectDB() {
  // The local network resolves Atlas hosts through NAT64; force a direct IPv4 connection.
  await mongoose.connect(process.env.MONGODB_URI, { family: 4 });
  console.log(`MongoDB connected: ${mongoose.connection.host}`);
}
