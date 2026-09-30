import mongoose from 'mongoose';
import { setDefaultResultOrder, setServers } from 'node:dns';

setServers(['1.1.1.1', '8.8.8.8']);
setDefaultResultOrder('ipv4first');

export async function connectDB() {
  // The local network resolves Atlas hosts through NAT64; force a direct IPv4 connection.
  await mongoose.connect(process.env.MONGODB_URI, { family: 4 });
  console.log(`MongoDB connected: ${mongoose.connection.host}`);
}
